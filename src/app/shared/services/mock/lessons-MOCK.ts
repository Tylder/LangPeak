import * as faker from 'faker';
import {Lesson, LessonPartEntry, LessonPartEntryType, LessonPartFull, PartTypes} from '../../models/lesson';
import {FillBlankTextQuestion} from '../../../features/lesson-entries/display-entries/questions-entry/models/questionDataTypes';

const questions: FillBlankTextQuestion[] = [];

for (let i = 0; i < 20; i++) {

  let sentence = faker.lorem.words(2 + getRandomInt(8));
  let sentenceParts = sentence.split(' ');
  let randomNumber = getRandomInt(sentenceParts.length);

  const part1: FillBlankTextQuestion = {
    id: faker.random.uuid(),
    index: 0,
    fullText: sentence,
    textBefore: sentenceParts.slice(0, randomNumber).join(' '),
    correctValues: [sentenceParts[randomNumber]],
    textAfter: sentenceParts.slice(randomNumber + 1).join(' '),
    alternatives: faker.lorem.words(4).split(' ')
  };

  if (sentenceParts.length <= 5) {

    sentence = faker.lorem.words(2 + getRandomInt(3));
    sentenceParts = sentence.split(' ');
    randomNumber = getRandomInt(sentenceParts.length);

    const part2: FillBlankTextQuestion = {
      id: faker.random.uuid(),
      index: 0,
      fullText: sentence,
      textBefore: sentenceParts.slice(0, randomNumber).join(' '),
      correctValues: [sentenceParts[randomNumber]],
      textAfter: sentenceParts.slice(randomNumber + 1).join(' '),
      alternatives: faker.lorem.words(4).split(' ')
    };

    const fillBlankText: FillBlankTextQuestion = {
      id: faker.random.uuid(),
      index: i,
      fullText: part1.fullText + part2.fullText,
      questions: [part1, part2]
    };
    questions.push(fillBlankText);
  }
  else {
    questions.push(part1);
  }
}

const partEntryText: LessonPartEntry = {
  type: LessonPartEntryType.TEXT,
  index: 0,
  data: {
    text: 'TEST TEXT'
  }
};

const partEntryQuestionGroup: LessonPartEntry = {
  type: LessonPartEntryType.FILLBLANKS,
  index: 1,
  data: { questions },
};

const lessonPart: LessonPartFull = {
  id: faker.random.uuid(),
  index: 0,
  title: faker.lorem.sentence(),
  entries: [partEntryText, partEntryQuestionGroup],
  type: PartTypes.MAIN,
  // dbRef: 'sdssd'
};

export const LESSONS: Lesson[] = [{
  id: faker.random.uuid(),
  title: 'Test',
  mainParts: [lessonPart]
}];




function getRandomInt(max: any) {
  return Math.floor(Math.random() * Math.floor(max));
}
