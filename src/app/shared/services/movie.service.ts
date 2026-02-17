import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Imovie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

emitNewMovie:Subject<Imovie> = new Subject<Imovie>()
emitRemoveId:Subject<string> = new Subject<string>()
emitEditObj:Subject<Imovie> = new Subject<Imovie>()
emitUpdatedObj:Subject<Imovie> = new Subject<Imovie>()

emitUpdatedObj$:Observable<Imovie> = this.emitUpdatedObj.asObservable()
emitRemoveId$:Observable<string> = this.emitRemoveId.asObservable()
emitNewMovie$:Observable<Imovie> = this.emitNewMovie.asObservable()
emitEditObj$:Observable<Imovie> = this.emitEditObj.asObservable()

updateObj(movie:Imovie){
  this.emitUpdatedObj.next(movie)
}

EditObj(movie:Imovie){
  this.emitEditObj.next(movie)
}

removeId(id:string){
  this.emitRemoveId.next(id)
}

newMovie(movie:Imovie){
    this.emitNewMovie.next(movie)
}


BASE_URL = environment.BASE_URL
MOVIE_URL = `${this.BASE_URL}/movies.json`

  constructor(private http:HttpClient) { }

  fetchAllMovies(){
   return this.http.get<any>(this.MOVIE_URL)
      .pipe(
        map(obj=>{
          let movieArr:Array<Imovie> = []

          for(const key in obj){
            movieArr.unshift({...obj[key],id:key})
          }

          return movieArr
        })
      )

  }

  createObj(movie:Imovie):Observable<Imovie>{
    return this.http.post<Imovie>(this.MOVIE_URL, movie)
  }


removeMovie(id:string):Observable<any>{
  let REMOVE_URL =`${this.BASE_URL}/movies/${id}.json`
  return this.http.delete<any>(REMOVE_URL)
}
  

  updateMovie(movie:Imovie){
    let UPDATE_URL = `${this.BASE_URL}/movies/${movie.id}.json`
    return this.http.patch(UPDATE_URL,movie)
  }
}
