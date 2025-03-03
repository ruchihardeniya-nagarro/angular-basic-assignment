import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatFormFieldModule, MatSelectModule, MatInputModule
  ] ,
  exports:[
    
    MatInputModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule
  ] 
})
export class AngularMaterialModule { }
