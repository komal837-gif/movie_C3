import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  emitLoadingStatus:Subject<boolean> = new Subject<boolean>()
  emitLodingStatus$:Observable<boolean> = this.emitLoadingStatus.asObservable()


  loadingStatus(flag:boolean){
    this.emitLoadingStatus.next(flag);
  }
}
