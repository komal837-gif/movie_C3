import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieDashboardComponent } from './shared/components/movie-dashboard/movie-dashboard.component';
import { MovieCardComponent } from './shared/components/movie-card/movie-card.component';
import { MovieFormComponent } from './shared/components/movie-form/movie-form.component';
import { GetConfirmComponent } from './shared/components/get-confirm/get-confirm.component';
import { MaterialModule } from './shared/modules/material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    MovieDashboardComponent,
    MovieCardComponent,
    MovieFormComponent,
    GetConfirmComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:LoaderInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
