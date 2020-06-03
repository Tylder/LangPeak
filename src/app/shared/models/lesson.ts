import {Db} from './db';
import {AngularFirestoreCollection} from '@angular/fire/firestore';

/**
 *  We separate data and state.
 *  Data is the same for any student/teacher but the state would be different.
 *  We need both to create the lesson.
 *
 *  1. A Teacher plans a lesson. This creates the state for the lesson.
 *  2. The state is stored separately on the db and merged with the lesson data in the angular service.
 *  3. The state
 */

export enum LessonPartEntryType {
  TEXT = 'text',
  FILLBLANKS = 'fillBlanks'
}

// QUESTION
export class QuestionState extends Db {
  isValid: boolean;
  isDirty: boolean;
  isShow: boolean;
  currentValue: any;
  pastGuesses?: any[];
  shownAlternativeAnswers: any[];
}

export interface QuestionData extends Db {
  // due to the entries having such varied questions-entry and sometimes multiple questions-entry per row it is possible to treat each QuestionData
  // as a container for more questions-entry
  id: string;  // make id required...is used to identify the question or group control
  correctValue?: any | any[];
  state?: QuestionState;
  alternatives?: any[];
  questions?: QuestionData[];
  temp?: {[k: string]: any}; // meant to hold any temp data not meant to be put in the db
}

// Lesson Part Entry
export class LessonPartEntryState extends Db { // meant to be inherited to create different question-group-types
  type: LessonPartEntryType;
}

export class LessonPartEntry extends Db { // meant to be inherited to create different question-group-types
  type: LessonPartEntryType;
  index: number;
  // questions?: QuestionData[];
  state?: LessonPartEntryState;
  data?: {[key: string]: any};
}

// LessonPart

export interface LessonPartState extends Db {
  isComplete: boolean;
  score: number;
}

export interface LessonPartPartial extends Db {
  /**
   *  Used so we dont have to fetch all parts at the same time
   */
  title: string;
  index: number;
  type: PartTypes;
  // dbRef: any;
  state?: LessonPartState;
}

export interface LessonPartFull extends LessonPartPartial {
  entries: LessonPartEntry[];
  entriesPath?: string;
}

export enum PartTypes {
  MAIN = 'main',
  PREPARE = 'prepare',
  HOMEWORK = 'homework',
}

export interface Lesson extends Db {

  /**
   * Each lessons consists of several parts, each part small enough to not have to scroll too much on mobile
   *  /Lesson                       -- The entire lesson
   *    /LessonPart                 -- Each lesson would contain many parts to make it easier to keep track of where you are
   *      /LessonPartEntry          -- Each part is built out of generic parts, video, text, image and so on. containing info and related questions-entry
   *        /Info                   -- Would contain the info part of the entry, the image, text, video...
   *        /QuestionGroup          -- Related questions-entry to the previous info, chosen in respect to difficulty
   *          /QuestionGroup          -- Sometimes there would be multiple questions-entry on one row, once all questions-entry are answered the row would be valid
   *            /Question           -- Individual question on row
   */

  title: string;
  mainParts?: (LessonPartPartial | LessonPartFull)[];
  prepParts?: (LessonPartPartial | LessonPartFull)[];
  homeworkParts?: (LessonPartPartial | LessonPartFull)[];
}


