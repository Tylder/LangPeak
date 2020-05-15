import {Db} from '../../../../../../shared/models/db';

/**
 *  We separate data and state.
 *  Data is the same for any student/teacher but the state would be different.
 *  We need both to create the lesson
 */

export enum LessonPartEntryType {
  TEXT = 'text',
  FILL_BLANKS = 'fillBlanks'
}

// QUESTION
export class QuestionState extends Db {
  isValid: boolean;
  isDirty: boolean;
  isShow: boolean;
  currentValue: any;
  pastGuesses?: any[];
}

export interface QuestionData extends Db {
  // due to the entries having such varied questions and sometimes multiple questions per row it is possible to treat each QuestionData
  // as a container for more questions
  id: string;  // make id required...is used to identify the question or group control
  correctValue?: any | any[];
  state?: QuestionState;
  alternatives?: any[];
  questions?: QuestionData[];
}

// Lesson Part Entry
export class LessonPartEntryState extends Db { // meant to be inherited to create different types
  type: LessonPartEntryType;
}

export class LessonPartEntryData extends Db { // meant to be inherited to create different types
  type: LessonPartEntryType;
  isQuestionType: boolean;
  questions?: QuestionData[];
  state?: LessonPartEntryState;
  data?: any;
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
  dbRef: any;
  state?: LessonPartState;
}

export interface LessonPartFull extends LessonPartPartial {
  entries: LessonPartEntryData[];
}



export interface Lesson extends Db {

  /**
   * Each lessons consists of several parts, each part small enough to not have to scroll too much on mobile
   *  /Lesson                       -- The entire lesson
   *    /LessonPart                 -- Each lesson would contain many parts to make it easier to keep track of where you are
   *      /LessonPartEntry          -- Each part is built out of generic parts, video, text, image and so on. containing info and related questions
   *        /Info                   -- Would contain the info part of the entry, the image, text, video...
   *        /QuestionGroup          -- Related questions to the previous info, chosen in respect to difficulty
   *          /QuestionGroup          -- Sometimes there would be multiple questions on one row, once all questions are answered the row would be valid
   *            /Question           -- Individual question on row
   */

  name: string;
  mainParts: (LessonPartPartial | LessonPartFull)[];
  prepParts?: (LessonPartPartial | LessonPartFull)[];
  homeWorkParts?: (LessonPartPartial | LessonPartFull)[];
}


