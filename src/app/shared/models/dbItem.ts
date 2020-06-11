import {Profile} from './profile';
import {AngularFirestoreDocument} from '@angular/fire/firestore';
import { firestore } from 'firebase';

export class DbItem {
  id?: string;
  path?: string;
  modifiedDate?: Date | firestore.Timestamp;
  createdDate?: Date | firestore.Timestamp;
  createdBy?: Profile;
}

export class DbItemFull extends DbItem {  // attrs are required
  id: string;
  path: string;
  modifiedDate: Date | firestore.Timestamp;
}

export class DbItemWithIndex extends DbItem {
  index: number;
}

export  class DbItemFullWithIndex extends DbItemFull {
  index: number;
}
