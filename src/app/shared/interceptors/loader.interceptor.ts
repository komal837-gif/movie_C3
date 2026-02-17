import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.loadingStatus(true)
    const reqClone = request.clone({
      setHeaders:{
        "auth":"Token From Local Storage",
        "content-type":"application/json"
      }
    })
    return next.handle(reqClone)
     .pipe(
       finalize(()=>{
        this.authService.loadingStatus(false)
      })
     )
  }
}
