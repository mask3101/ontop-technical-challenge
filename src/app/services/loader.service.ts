import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject(true); 
  isLoading$ = this.isLoading.asObservable();

  updateLoadingStatus(state: boolean) {
    this.isLoading.next(state);
  }
}
