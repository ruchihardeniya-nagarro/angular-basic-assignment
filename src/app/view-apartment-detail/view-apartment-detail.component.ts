import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ApartmentDetailService } from '../service/apartment-detail.service';
import { ActivatedRoute } from '@angular/router';
import { apartment } from '../interface/apartment.models';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-view-apartment-detail',
  imports: [MatCardModule, MatButtonModule, CommonModule,HttpClientModule,ImageSliderComponent,AngularMaterialModule,ReactiveFormsModule],
  templateUrl: './view-apartment-detail.component.html',
  providers:[ApartmentDetailService,AuthService],
  styleUrl: './view-apartment-detail.component.scss'
})
export class ViewApartmentDetailComponent implements OnInit{
  constructor( 
    private apartService:ApartmentDetailService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService:AuthService,
  ){}
  apartmentDetail:apartment | undefined;
  commentForm!: FormGroup;
  
  ngOnInit(){
    this.getApartmentdetail();
    this.commentForm = this.fb.group({
        comment: ['', []],  // Username validation
      });
  }


  getApartmentdetail(){
    const id = +this.route.snapshot.paramMap.get('id')!;
    if(id){
      this.apartService.getApartmentById(id).subscribe((data)=>{
      this.apartmentDetail = data;
    })}
  }

  
  
    // Method to handle form submission
    onSubmit(): void {
      if (this.commentForm.invalid) {
        return;  // Stop if form is invalid
      }
      let user = JSON.parse(this.authService.getUser());
      const apartmentId = +this.route.snapshot.paramMap.get('id')!;  
      const { comment  } = this.commentForm.value;
      console.log("username",comment,user?.id )

      if(user && comment){
        this.apartService.addComment(apartmentId,user.id,comment).subscribe({
        next: () => {
          console.log("comment added successfully");

        },
        error: (err) => {
          console.error(err);
        },
      });
      }
    }

}
