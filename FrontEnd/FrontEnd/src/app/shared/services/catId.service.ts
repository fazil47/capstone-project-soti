import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatIdService {
  private selectedCatIdSubject = new BehaviorSubject<number>(null);

  setCatId(catId: number) {
    this.selectedCatIdSubject.next(catId);
  }

  getCatId(): Observable<number> {
    return this.selectedCatIdSubject.asObservable();
  }
}
