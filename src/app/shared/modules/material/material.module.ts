import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

let matArr = [ MatIconModule, MatButtonModule,  MatDialogModule, MatSnackBarModule, CommonModule , MatProgressSpinnerModule]

@NgModule({
  declarations: [],
  imports: [ ...matArr ],
  exports:[...matArr]
})
export class MaterialModule { }
