import {QuestionData} from './lesson';

export interface FillBlankTextQuestion extends QuestionData {
  fullText: string;
  textBefore?: string;
  textAfter?: string;
  questions?: FillBlankTextQuestion[]; // use this array if there is any chance of their being multiple questions
}
