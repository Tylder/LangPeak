import {Observable, of, ReplaySubject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';


export class BaseMockHttpService<T> {

  MOCK_DATA: any;
  private mockData$: ReplaySubject<T[]>;

  constructor(private snackBar: MatSnackBar) {
    this.mockData$ = new ReplaySubject<T[]>(1);
  }

  getAll$(): ReplaySubject<T[]> {
    this.mockData$.next(this.MOCK_DATA);
    return this.mockData$;
  }

  add$(entry: T): Observable<any> {
    this.MOCK_DATA.push(entry);
    this.mockData$.next(this.MOCK_DATA);
    return of(true);
  }

  edit$(index: number, entry: T): Observable<boolean> {
    this.MOCK_DATA[index] = entry;
    this.mockData$.next(this.MOCK_DATA);
    return of(true);
  }

  delete$(id: string): Observable<any> {
    const index = this.MOCK_DATA.findIndex(entry => entry._id === id);
    this.MOCK_DATA.splice(index, 1);
    this.mockData$.next(this.MOCK_DATA);
    return of(true);
  }
}
