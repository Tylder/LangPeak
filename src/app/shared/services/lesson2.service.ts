import {Injectable} from '@angular/core';
import {Lesson, LessonPartEntry, LessonPartEntryType, LessonPartFull, LessonPartPartial, PartTypes, QuestionData} from '../models/lesson';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, combineLatest, forkJoin, interval, merge, Observable, of, ReplaySubject, timer, zip} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument, QueryFn} from '@angular/fire/firestore';
import {catchError, map, mergeMap, take, tap} from 'rxjs/operators';
import {BaseFirestoreService} from './base-firestore.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DbItemFullWithIndex} from '../models/dbItem';
// import { firestore as fs } from 'firebase';
// import WriteBatch = firebase.firestore.WriteBatch;
// import { Writebatch } from 'firebase.firestore';

// import WriteBatch = firebase.firestore.WriteBatch;

export interface LessonPartsSeparated {
  [PartTypes.MAIN]: Array<LessonPartFull | LessonPartPartial>;
  [PartTypes.PREPARE]: Array<LessonPartFull | LessonPartPartial>;
  [PartTypes.HOMEWORK]: Array<LessonPartFull | LessonPartPartial>;
}

@Injectable({
  providedIn: 'root'
})
export class Lesson2Service extends BaseFirestoreService<Lesson> {

  lesson$: ReplaySubject<Lesson>;
  lessonPart$: ReplaySubject<LessonPartFull>;

  lessonPartsSeparated$: BehaviorSubject<LessonPartsSeparated>;
  lessonParts$: BehaviorSubject<Array<LessonPartPartial | LessonPartFull>>;

  constructor(firestore: AngularFirestore,
              snackBar: MatSnackBar,
              private route: ActivatedRoute) {

    super(firestore, snackBar);

    this.baseCollection = firestore.collection('lessons');

    this.lesson$ = new ReplaySubject<Lesson>(1);
    this.lessonPart$ = new ReplaySubject<LessonPartFull>(1);
    this.lessonPartsSeparated$ = new BehaviorSubject<LessonPartsSeparated>(undefined);
    this.lessonParts$ = new BehaviorSubject<Array<LessonPartPartial | LessonPartFull>>(undefined);

    this.lessonPart$.subscribe(val => console.log(val));
    this.lesson$.subscribe(val => console.log(val));

    console.log('--- LESSON SERVICE LOADED');

    // timer(0, 2000).pipe(
    //   mergeMap(() => this.lesson$)
    // ).subscribe(val => console.log(val));
    //
    // timer(0, 2000).pipe(
    // ).subscribe(val => console.log(val));

    // this.listenForLessonAndPartsAtCurrentRoute();
  }


  lessonPartMoveItemInArray(array: LessonPartPartial[], fromIndex: number, toIndex: number): Observable<any> {

    const batch = this.getBatchFromMoveItemInIndexedDocs(array as DbItemFullWithIndex[], fromIndex, toIndex);

    return this.batchCommit(batch);
  }


  lessonPartTransferItemBetweenArray(previousArray: LessonPartPartial[],
                                     currentArray: LessonPartPartial[],
                                     previousIndex: number,
                                     currentIndex: number,
                                     newType: PartTypes,
                                     useCopy = false): Observable<any> {
    /**
     * Used mainly for drag and drop scenarios where we drag an item from one array to another and the the docs have an index attribute.
     */

    const batch = this.getBatchFromTransferItemInIndexedDocs(previousArray as DbItemFullWithIndex[],
      currentArray as DbItemFullWithIndex[],
      previousIndex,
      currentIndex,
      {type: newType},
      useCopy);

    return this.batchCommit(batch);
  }

  // listenForLessonAndPartsAtCurrentRoute() {
  //   /**
  //    * Updates the ReplaySubjects based on the current route
  //    */
  //
  //   this.listenForLessonAtCurrentRoute().subscribe(lesson => this.lesson$.next(lesson));
  // }


  listenForLessonAtCurrentRoute(): Observable<Lesson> {
    return this.route.paramMap.pipe(
      tap((params: ParamMap) => console.log(params)),
      map((params: ParamMap) => params.get('lessonId')),
      mergeMap(lessonId => this.listenForLesson$(lessonId))
    );
  }

  listenForLessonPartsAtCurrentRoute(): Observable<LessonPartsSeparated> {
    return this.route.paramMap.pipe(
      tap(val => console.log(val)),
      map((paramMap) => paramMap.get('lessonId')),
      mergeMap(lessonId => this.listenForLessonPartListSeparated$(lessonId))
    );
  }

  listenForLessonList$(queryFn?: QueryFn): Observable<Lesson[]> {
    console.log(queryFn);
    const collection = this.firestore.collection<Lesson[]>('lessons', queryFn);
    return this.listenForCollection$(collection);
  }

  listenForLessonPartListSeparated$(lessonId: string, queryFn?: QueryFn): Observable<LessonPartsSeparated> {
    // const collection = this.baseCollection.doc(lessonId).collection<LessonPartPartial>('parts',
    //     ref => ref.orderBy('index'));
    // return this.listenForCollection$<LessonPartPartial | LessonPartFull>(collection).pipe(
    return this.listenForLessonParts$(lessonId, queryFn).pipe(
      map((parts) => {

        const partsSeparated: LessonPartsSeparated = {[PartTypes.MAIN]: [], [PartTypes.PREPARE]: [], [PartTypes.HOMEWORK]: []};

        parts.forEach((part) => {
          partsSeparated[part.type].push(part);
        });
        return partsSeparated;
      })
    );
  }

  listenForLessonParts$(lessonId: string, queryFn?: QueryFn): Observable<Array<LessonPartPartial>> {
    const collection = this.baseCollection.doc(lessonId).collection<LessonPartPartial>('parts',
      ref => ref.orderBy('index'));

    return this.listenForCollection$<LessonPartPartial>(collection);
  }

  listenForLesson$(lessonId: string): Observable<Lesson> {
    const doc = this.baseCollection.doc(lessonId);
    return this.listenForDoc$(doc);
  }

  listenForLessonPart$(lessonId: string, partId: string): Observable<any> {
    /**
     * Gets the full lessonPart including the entries
     */
    const partRef = this.baseCollection
      .doc(lessonId)
      .collection('parts')
      .doc<LessonPartFull>(partId);

    const part$ = this.listenForDoc$<LessonPartPartial>(partRef);

    const partEntriesData$ = this.listenForPartEntriesData$(lessonId, partId);

    return combineLatest([part$, partEntriesData$]).pipe(
      tap(val => console.log(val)),
      map(([partData, entriesData]) => {
        if (entriesData.entries.length > 0) { return {...entriesData, ...partData }; }
        else {  return {...partData}; }  // dont include an empty array
        // return {entries, ...partData};
      }),
      tap(val => console.log(val)),
    );
  }

  listenForPartEntriesData$(lessonId: string, partId: string): Observable<{entries: LessonPartEntry[], entriesPath?: string}> {
    const partEntriesRef = this.baseCollection
      .doc(lessonId)
      .collection('parts')
      .doc<LessonPartFull>(partId)
      .collection('entries', ref => ref.orderBy('index'));

    const partEntries$ = this.listenForCollection$<LessonPartEntry>(partEntriesRef, );

    return partEntries$.pipe(
      mergeMap((entries) => {

        if (entries.length <= 0) {
          return of(entries);
        }

        const questionsObs: Array<Observable<any>> = [];

        for (const entry of entries) {

          const questions$ = this.listenForEntryQuestions$(entry.path).pipe(
            map((questions) => {
              if (questions.length > 0) {
                return {...entry, data: {questions}};
              } else {
                return {...entry};
              }  // dont include an empty array
            }),
            tap(questions => console.log(questions))
          );

          questionsObs.push(questions$);
        }

        return combineLatest(questionsObs).pipe(
          tap(val => console.log(val))
        );

      }),
      map((entries) => {
        return {entries, entriesPath: partEntriesRef.ref.path};
      }),
      tap(val => console.log(val)),
    );
  }

  listenForPartEntry$(entryPath: string, includeQuestions = false): Observable<LessonPartEntry> {
    const docRef = this.firestore.doc(entryPath);

    return this.listenForDoc$<LessonPartEntry>(docRef).pipe(
      mergeMap((entry) => {
        if (includeQuestions) {
          return this.listenForEntryQuestions$(entry.path).pipe(
            map((questions) => {
              if (questions.length > 0) {
                return {...entry, data: {questions}};
              } else {
                return {...entry};
              }  // dont include an empty array
            })
          );
        } else {
         return of(entry);
        }
      })
    );
  }

  listenForEntryQuestions$(entryPath: string): Observable<QuestionData[]> {
    const path = this.firestore.doc(entryPath).collection('questions').ref.path;

    return this.listenForEntryQuestionsByPath$(path);
  }

  listenForEntryQuestionsByPath$(path: string): Observable<any> {
    /**
     * By path is meant to be called recursively
     */
    return this.listenForCollectionRecursively<QuestionData>(path, 'questions', 'index').pipe(
      tap(val => console.log(val))
    );
  }

  getLessonDoc(lessonId): AngularFirestoreDocument {
    return this.baseCollection.doc(lessonId);
  }

  getLessonPartDoc(lessonId, partId): AngularFirestoreDocument {
    return this.getLessonDoc(lessonId).collection('parts').doc(partId);
  }

  addPartToLesson$(part: LessonPartPartial, lessonId: string) {
    const partsCollection = this.getLessonDoc(lessonId).collection('parts');

    delete part.id; // dont save the id if there is one..
    delete part.path; // dont save the path

    return this.add$(part, partsCollection);
  }

  addEntryToPart$(entry: LessonPartEntry, part: LessonPartFull | LessonPartEntry): Observable<any> {
    const entryCollection = this.firestore.doc(part.path).collection('entries');

    delete entry.id; // dont save the id if there is one..
    delete entry.path; // dont save the path

    return this.add$(entry, entryCollection);
  }

  addQuestion$(doc: LessonPartEntry | QuestionData, question: QuestionData): Observable<any> {
    const questionCollection = this.firestore.doc(doc.path).collection('questions');

    delete question.id; // dont save the id if there is one..
    delete question.path; // dont save the path

    return this.add$(question, questionCollection);
  }

  updateQuestion$(question: QuestionData) {
    const doc = this.firestore.doc(question.path);

    delete question.id; // dont save the id if there is one..
    delete question.path; // dont save the path

    return this.update$(question, doc);
  }


  updateLesson$(lesson: Lesson, lessonId: string) {

    delete lesson.id; // dont save the id if there is one..
    delete lesson.path; // dont save the path

    return this.update$(lesson, this.baseCollection.doc(lessonId));
  }





}
