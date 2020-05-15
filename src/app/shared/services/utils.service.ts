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
}
