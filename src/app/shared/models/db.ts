import {Profile} from './profile';
import {AngularFirestoreDocument} from '@angular/fire/firestore';
import { firestore } from 'firebase';

export class Db {
  id?: string;
  path?: string;
  modifiedDate?: Date | firestore.Timestamp;
  createdDate?: Date | firestore.Timestamp;
  createdBy?: Profile;
}
