// export {};
//
// declare global {
//   interface Array<T> {
//     sample(): T;
//   }
// }
//
// if (!Array.prototype.sample) {
//   Array.prototype.sample = function<T>(): T {
//     // tslint:disable-next-line:no-bitwise
//     return this[~~(Math.random() * this.length)];
//   };
// }


function SampleArray<T>(array: Array<T>): T {
  // tslint:disable-next-line:no-bitwise
  return array[~~(Math.random() * array.length)];
}
