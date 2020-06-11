import {combineLatest, from, Observable, of, throwError, zip} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AngularFirestore, AngularFirestoreDocument, DocumentChangeType, DocumentReference} from '@angular/fire/firestore';
import {CollectionReference, DocumentChangeAction, QueryFn} from '@angular/fire/firestore/interfaces';
import {catchError, filter, map, mergeMap, take, tap} from 'rxjs/operators';
import {AngularFirestoreCollection} from '@angular/fire/firestore/collection/collection';
import {DbItem, DbItemFullWithIndex} from '../models/dbItem';
import {FirebaseError} from 'firebase';
import { firestore as fs } from 'firebase';
import {moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {LessonPartPartial, PartTypes, QuestionData} from '../models/lesson';
// import FieldValue = firebase.firestore.FieldValue;
// import * as firebase from 'firebase';

export class BaseFirestoreService<T> {

  baseCollection: AngularFirestoreCollection<T>;

  constructor(public firestore: AngularFirestore,
              protected snackBar: MatSnackBar) {
  }

  listenForChangesInBaseCollection$(): Observable<T[]> {
    return this.listenForCollection$(this.baseCollection);
  }

  listenForDocInBaseCollectionById<A>(id: string) {
    return this.listenForDoc$(
      this.baseCollection.doc(id)
    );
  }

  addToBaseCollection$(data: T, id?: string) {
    return this.add$<T>(data, this.baseCollection, id);
  }

  getRefFromPath(path: string): DocumentReference | CollectionReference {
    const pathSegmentAmount: number = path.split('/').length;
    if (pathSegmentAmount % 2 === 0) { // even number means doc
      return this.firestore.doc(path).ref;
    } else { // odd meaning collection
      return this.firestore.collection(path).ref;
    }
  }


  listenForDoc$<A extends DbItem>(doc: AngularFirestoreDocument): Observable<A> {
    /**
     * Returns an observable that will emit whenever the ref changes in any way.
     * Also adds the id and ref to the object.
     */
    const res$ = doc.snapshotChanges().pipe(
      mergeMap((action) => {
        if (!action.payload.exists) { return throwError('Document Does not exists'); }
        else { return of(action); }
      }),
      map((action) => {
        const data = action.payload.data() as A;
        const id = action.payload.id;
        const docRef = action.payload.ref;
        const path = docRef.path;
        // const afDocRef = this.fireStore.doc<A>(docRef.path) as AngularFirestoreDocument;  // TODO make sure this also copies the query
        return { ...data, id, path };
      }),
      map((data: A) => this.convertTimestampToDate(data)),
    ) as Observable<A>;

    return this.handleRes$<A>(res$);
  }

  listenForCollection$<A extends DbItem>(collection: AngularFirestoreCollection,
                                         listenToTypes: DocumentChangeType[] = ['added', 'removed', 'modified']): Observable<A[]> {
    /**
     * Returns an observable that will emit whenever the ref changes in any way.
     * Also adds the id and ref to the object.
     */
    const res$ = collection.snapshotChanges().pipe(

      map((actions) => actions.filter(a => {
        return listenToTypes.includes(a.type);
      })),
      map((actions) => actions.map(a => {

        // console.log(a.type, a);

        const data = a.payload.doc.data() as A;
        const id = a.payload.doc.id;
        const docRef = a.payload.doc.ref;
        const path = docRef.path;
        // const afDocRef = this.fireStore.doc<A>(docRef.path) as AngularFirestoreDocument; // TODO make sure this also copies the query
        return { ...data, id, path };
      })),
      map((datas: A[]) => datas.map(data => {
          return this.convertTimestampToDate(data);
      }))
    ) as Observable<A[]>;

    return this.handleRes$<A[]>(res$);
  }

  addCreatedDate<A>(data: A): A {
    const createdDate = new Date();
    return {...data, createdDate};
  }

  addModifiedDate<A>(data: A): A {
    const modifiedDate = new Date();
    return {...data, modifiedDate};
  }

  addCreatedBy<A>(data: A, createdBy: any): A {
    return {...data, createdBy};
  }

  convertTimestampToDate<A extends DbItem>(data: A): A {
    if (data.hasOwnProperty('createdDate')) {
      data.createdDate = data.createdDate as fs.Timestamp;
      data.createdDate = data.createdDate.toDate();
    }
    if (data.hasOwnProperty('modifiedDate')) {
      data.modifiedDate = data.modifiedDate as fs.Timestamp;
      data.modifiedDate = data.modifiedDate.toDate();
    }

    return data;
  }

  add$<A>(data: A, collection: AngularFirestoreCollection, id?: string): Observable<A> {

    return of(null).pipe(
      mergeMap(() => {
        let res$: Observable<any>;

        data = this.addCreatedDate(data);
        data = this.addModifiedDate(data);

        if (id !== undefined) { res$ = from(collection.doc(id).set(data)); }
        else { res$ = from(collection.add(data)); }

        res$ = res$.pipe(
          // tap(() => this.snackBar.open('Success', 'Added', {duration: 1000})),
          map(val => {
            if (id === undefined) {
              val = val as DocumentReference;
              return {...data, id: val.id, path: val.path };
            } else {
              const path = collection.ref.path + '/' + id;
              return {...data, id, path };
            }
          }),
          // catchError(err => {
          //   this.snackBar.open('Error', 'Failed to add to Collection, ' + err, {duration: 1000});
          //   return of(false);
          // }),
        );

        return this.handleRes$(res$, 'Document Added Successfully', 'Document failed to add');
      })
    );
  }

  // addToBatch$<A>(data: A, collection: AngularFirestoreCollection, id?: string): fs.WriteBatch {
  //   const batch = this.firestore.firestore.batch();
  //
  //   data = this.addCreatedDate(data);
  //   data = this.addModifiedDate(data);
  //
  //   if (id !== undefined) { batch. }
  //   else { res$ = from(collection.add(data)); }
  // }

  update$<A>(data: A, doc: AngularFirestoreDocument): Observable<boolean> {
    /**
     * transforms the promise to an observable
     */
    return of(null).pipe(
      mergeMap(() => {
        let res$: Observable<any>;

        data = this.addModifiedDate(data);

        res$ = from(doc.update(data));

        return this.handleRes$(res$, 'Updated', 'Failed to Update Document');
      })
    );
  }

  delete$(doc: AngularFirestoreDocument): Observable<any> {

    return of(null).pipe(
      mergeMap(() => {
        let res$: Observable<any>;
        res$ = from(doc.delete());

        return this.handleRes$(res$, 'Deleted', 'Failed to Delete Document');
      })
    );
  }

  batchCommit(batch: fs.WriteBatch): Observable<any> {
    return of(null).pipe(
      mergeMap(() => {
        let res$: Observable<any>;
        res$ = from(batch.commit());

        return this.handleRes$(res$, 'Updated', 'Failed to Update Documents');
      })
    );
  }

  updateDocByPath$<A>(path: string, data: A): Observable<any> {
    const doc = this.firestore.doc(path);
    return this.update$(data, doc);
  }

  deleteDocByPath(path: string): Observable<any> {
    const doc = this.firestore.doc(path);
    return this.delete$(doc);
  }



  handleRes$<A>(result$: Observable<A>, successMessage?: string, errorMessage?: string): Observable<A> {
    return result$.pipe(
      // tap(val => console.log(val)),
      tap(() => {
        if (successMessage !== undefined) { (this.snackBar.open('Success', successMessage, {duration: 1000})); }
      }),
      // map(() => true),
      catchError((err: FirebaseError) => {
        console.log(err);
        if (errorMessage !== undefined) { this.snackBar.open('Error', errorMessage + '-' +  err.code, {duration: 1000}); }
        throw err;
      }),

    );
  }

  getBatchFromMoveItemInIndexedDocs<A extends DbItemFullWithIndex>(array: Array<A>,
                                                                   fromIndex: number,
                                                                   toIndex: number,
                                                                   useCopy = false) {
    /**
     * Moved item within the same list so we need to update the index of all items in the list;
     * Use a copy if you dont wish to update the given array, for example when you watch to just listen for the change of the db..
     * The reason to not do this is because it takes some time for the db to update and it looks better if the list updates immediately.
     */

    const lowestIndex = Math.min(fromIndex, toIndex);
    const batch = this.firestore.firestore.batch();

    if (fromIndex === toIndex) { // we didnt really move anything
      return batch;
    }

    let usedArray: Array<A>;

    if (useCopy) {
      usedArray = Object.assign([], array);
    } else {
      usedArray = array;
    }

    console.log(usedArray, array);

    moveItemInArray(usedArray, fromIndex, toIndex);

    const listSliceToUpdate: A[] = usedArray.slice(lowestIndex);

    let i = lowestIndex;
    for (const item of listSliceToUpdate) {
      const ref = this.getRefFromPath(item.path) as DocumentReference;
      batch.update(ref, {index: i});
      i++;
    }

    return batch;
  }

  getBatchFromTransferItemInIndexedDocs<A extends DbItemFullWithIndex>(previousArray: A[],
                                                                       currentArray: A[],
                                                                       previousIndex: number,
                                                                       currentIndex: number,
                                                                       additionalDataUpdateOnMovedItem?: {[key: string]: any},
                                                                       useCopy = false): fs.WriteBatch {

    /**
     * Used mainly for drag and drop scenarios where we drag an item from one array to another and the the docs have an index attribute.
     */

    const batch = this.firestore.firestore.batch();

    let usedPreviousArray: Array<A>;
    let usedCurrentArray: Array<A>;
    if (useCopy) {
      usedPreviousArray = Object.assign([], previousArray);
      usedCurrentArray = Object.assign([], currentArray);
    } else {
      usedPreviousArray = previousArray;
      usedCurrentArray = currentArray;
    }

    transferArrayItem(usedPreviousArray, usedCurrentArray, previousIndex, currentIndex);

    if (additionalDataUpdateOnMovedItem !== undefined) {
      const movedItem = currentArray[currentIndex];
      const movedPartRef = this.getRefFromPath(movedItem.path) as DocumentReference;
      batch.update(movedPartRef, additionalDataUpdateOnMovedItem);
    }

    const currentArraySliceToUpdate: A[] = usedCurrentArray.slice(currentIndex);
    let i = currentIndex;
    for (const item of currentArraySliceToUpdate) {
      const ref = this.getRefFromPath(item.path) as DocumentReference;
      batch.update(ref, {index: i});
      i++;
    }

    const prevArraySliceToUpdate: A[] = usedPreviousArray.slice(previousIndex);
    i = previousIndex;
    for (const item of prevArraySliceToUpdate) {
      const ref = this.getRefFromPath(item.path) as DocumentReference;
      batch.update(ref, {index: i});
      i++;
    }

    return batch;
  }

  getBatchFromDeleteItemInIndexedDocs<A extends DbItemFullWithIndex>(array: A[]): fs.WriteBatch {

    /**
     * Run this on collections with a fixed order using an index: number attribute;
     * This will update that index with the index in the collectionData, so it should be sorted by index first.
     * Basically needs to be run after a delete
     */

    const batch = this.firestore.firestore.batch();

    array.forEach((item, index) => {
      if (item.index !== index) {
        const ref = this.getRefFromPath(item.path) as DocumentReference;
        batch.update(ref, {index});
      }
    });

    return batch;
  }

  updateIndexAfterDeleteInIndexedDocs<A extends DbItemFullWithIndex>(array: A[]): Observable<any> {
    const batch = this.getBatchFromDeleteItemInIndexedDocs(array);
    return this.batchCommit(batch);
  }

  listenForCollectionRecursively<A extends DbItem>(path: string, collectionKey: string, orderKey?: string): Observable<any> {

    /**
     * Listens for collections inside collections with the same name to an unlimited depth and returns all of it as an array.
     */
    let ref;

    if (orderKey != null) {
      ref = this.firestore.collection(path, r => r.orderBy(orderKey));
    } else {
      ref = this.firestore.collection(path);
    }

    return this.listenForCollection$<A>(ref).pipe(
      mergeMap(items => {

        if (items.length <= 0) { return of([]); } // TODO  perhaps make this throw an error so that we can skip it

        // if (items.length <= 0) { throwError('No more '); }

        const nextLevelObs: Array<Observable<A>> = [];

        for (const item of items) {

          const nextLevelPath = this.firestore.doc(item.path).collection(collectionKey).ref.path;  // one level deeper

          const nextLevelItems$ = this.listenForCollectionRecursively(nextLevelPath, collectionKey, orderKey).pipe(
            map((nextLevelItems: A[]) => {
              if (nextLevelItems.length > 0) { return {...item, [collectionKey]: nextLevelItems } as A; }
              else {  return {...item} as A; }  // dont include an empty array
            }),
          );
          nextLevelObs.push(nextLevelItems$);
        }

        return combineLatest(nextLevelObs).pipe(
          tap(val => console.log(val))
        );
      }),

    );
  }


  // addRef$<A extends Db>(data: A): Ob

  //
  // add$(entry: T): Observable<any> {
  //   this.MOCK_DATA.push(entry);
  //   this.mockData$.next(this.MOCK_DATA);
  //   return of(true);
  // }
  //
  // edit$(index: number, entry: T): Observable<boolean> {
  //   this.MOCK_DATA[index] = entry;
  //   this.mockData$.next(this.MOCK_DATA);
  //   return of(true);
  // }
  //
  // delete$(id: string): Observable<any> {
  //   const index = this.MOCK_DATA.findIndex(entry => entry._id === id);
  //   this.MOCK_DATA.splice(index, 1);
  //   this.mockData$.next(this.MOCK_DATA);
  //   return of(true);
  // }
}
