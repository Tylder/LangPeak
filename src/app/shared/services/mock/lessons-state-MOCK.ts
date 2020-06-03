import * as faker from 'faker';
import {Lesson, LessonPartFull, LessonPartEntryType, LessonPartEntry} from '../../models/lesson';
import {FillBlankTextQuestion} from '../../../features/lesson-entries/display-entries/questions-entry/models/questionDataTypes';


export class LessonStateMock {


  constructor() {}

  getPartState(lessonPartFull: LessonPartFull) {
    // lessonPartFull.
  }
}


const questions: FillBlankTextQuestion[] = [];




for (let i = 0; i < 20; i++) {

  let sentence = faker.lorem.words(2 + getRandomInt(8));
  let sentenceParts = sentence.split(' ');
  let randomNumber = getRandomInt(sentenceParts.length);

  const part1: FillBlankTextQuestion = {
    id: faker.random.uuid(),
    fullText: sentence,
    textBefore: sentenceParts.slice(0, randomNumber).join(' '),
    correctValue: sentenceParts[randomNumber],
    textAfter: sentenceParts.slice(randomNumber + 1).join(' '),
    alternatives: faker.lorem.words(4).split(' ')
  };

  if (sentenceParts.length <= 5) {

    sentence = faker.lorem.words(2 + getRandomInt(3));
    sentenceParts = sentence.split(' ');
    randomNumber = getRandomInt(sentenceParts.length);

    const part2: FillBlankTextQuestion = {
      id: faker.random.uuid(),
      fullText: sentence,
      textBefore: sentenceParts.slice(0, randomNumber).join(' '),
      correctValue: sentenceParts[randomNumber],
      textAfter: sentenceParts.slice(randomNumber + 1).join(' '),
      alternatives: faker.lorem.words(4).split(' ')
    };

    const fillBlankText: FillBlankTextQuestion = {
      id: faker.random.uuid(),
      fullText: part1.fullText + part2.fullText,
      questions: [part1, part2]
    };
    questions.push(fillBlankText);
  }
  else {
    questions.push(part1);
  }
}

const partEntryQuestionGroup: LessonPartEntry = {
  type: LessonPartEntryType.QUESTIONS,
  index: 1,
  questions
};

const lessonPart: LessonPartFull = {
  id: faker.random.uuid(),
  index: 0,
  title: faker.lorem.sentence(),
  entries: [partEntryQuestionGroup],
  dbRef: 'sdssd'
};

export const LESSONS: Lesson[] = [{
  id: faker.random.uuid(),
  name: 'Test',
  mainParts: [lessonPart]
}];




function getRandomInt(max: any) {
  return Math.floor(Math.random() * Math.floor(max));
}
