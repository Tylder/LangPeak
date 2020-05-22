import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  sampleArray<T>(array: Array<T>): T {
    // tslint:disable-next-line:no-bitwise
    return array[~~(Math.random() * array.length)];
  }

  shuffleArray<T>(array: Array<T>): Array<T> {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  rangeArray(start, end) {
    return Array.from({length: (end - start)}, (v, k) => k + start);
  }
}
