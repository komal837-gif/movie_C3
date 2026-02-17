import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isLoading:boolean = false;

  title = 'movie_C3';
   constructor(private loaderService:AuthService){}


ngOnInit(): void {
  this.loaderService.emitLodingStatus$.subscribe(res=>{
    this.isLoading = res
    console.log(res);
    
  })
}
}
