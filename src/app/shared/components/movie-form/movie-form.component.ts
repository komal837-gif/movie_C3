import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Imovie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {
 movieForm!:FormGroup
 isInEditMode:boolean = false;
EditId!:string;

  constructor(private movieService:MovieService) { }

  ngOnInit(): void {
    this.createForm()
    this.patchVal()
    
  }

  createForm(){
    this.movieForm = new FormGroup({
      title: new FormControl("",[Validators.required]),
      director:new FormControl("",[Validators.required]),
      year:new FormControl("",[Validators.required]),
      rating:new FormControl("",[Validators.required]),
      poster:new FormControl("",[Validators.required]),
      cast:new FormArray([new FormControl('',[Validators.required])]),
      genre:new FormArray([new FormControl("",[Validators.required])])
    })
  }

  get cast(){
    return this.movieForm.get('cast') as FormArray
  }

  addCast(){
    this.cast.push(new FormControl(""))
  }

  removeCast(index:number){
    this.cast.removeAt(index)
  }

  get genre(){
    return this.movieForm.get('genre') as FormArray
  }

  addGenre(){
    this.genre.push(new FormControl(""))
  }

  removeGenre(index:number){
    this.genre.removeAt(index)
  }

  onSubmit(){
    let movieObj = this.movieForm.value;
    this.movieService.createObj(movieObj).subscribe(res=>{
      this.movieForm.reset()
      this.movieService.newMovie({...movieObj,id:res.name})
  })
}

patchVal(){
  this.movieService.emitEditObj$.subscribe(res=>{
    if(res){
      this.isInEditMode = true;
      this.EditId = res.id;
      this.movieForm.patchValue(res)
    }
  })
}

onUpdate( ){
  let updatedObj:Imovie = {
    ...this.movieForm.value,
    id:this.EditId
  }
 this.movieService.updateMovie(updatedObj).subscribe(res=>{
  if(res){
    this.isInEditMode = false;
    this.movieForm.reset();
    this.movieService.updateObj(updatedObj)
  }
 })

}

}