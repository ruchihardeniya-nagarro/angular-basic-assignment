import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { ApartmentDetailService } from '../../service/apartment-detail.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule,AngularMaterialModule,CommonModule,HttpClientModule],
  templateUrl: './create-post.component.html',
  providers:[ApartmentDetailService],
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent implements OnInit{
  propertyForm: FormGroup;
  amenitiesList: string[] = ['WiFi', 'Gym', 'Parking', 'Pool','laundry'];
  previewData: any = null;

  constructor(
    private fb: FormBuilder,
    private apartmentDdetailService :ApartmentDetailService,
    private router:Router
   ) {
    // Define the form controls and validations
    this.propertyForm = this.fb.group({
      aparmentSelected:['',Validators.required],
      name: ['', Validators.required],
      ownerShip:['',Validators.required],
      address: ['',Validators.required],
      rent: ['',Validators.required],
      furnishedDetail: ['',Validators.required],
      title:  ['',Validators.required],
      description: ['',Validators.required],
      contactInfo: ['', [Validators.required, Validators.email]],
      amenities: this.fb.group({
        pool: [false],
        gym: [false],
        parking: [false],
        wifi: [false],
        laundry: [false],
      }),
    });
        // this.addAmenitiesControls();

  }

  // Toggle checkbox selections
  // onAmenityChange(event: any) {
  //   const amenitiesArray = this.propertyForm.get('amenities') as any;
  //   console.log("event",event)
  //   if (event.checked) {
  //     amenitiesArray.push(event.source.value);
  //   } else {
  //     const index = amenitiesArray.value.indexOf(event.source.value);
  //     if (index >= 0) {
  //       amenitiesArray.removeAt(index);
  //     }
  //   }
  // }
  addAmenitiesControls() {
    const amenitiesArray = this.propertyForm.get('amenities') as FormArray;
    this.amenitiesList.forEach(() => amenitiesArray.push(this.fb.control(false)));
  }
  ngOnInit(): void {
  }
  onAmenityChange(event: any){
    const amenitiesArray = this.propertyForm.get('amenities') as FormArray;
    if (event.checked) {
          amenitiesArray.push(this.fb.control(''));
          amenitiesArray.push(event.source.value);
        } else {
          const index = amenitiesArray.value.indexOf(event.source.value);
          if (index >= 0) {
            amenitiesArray.removeAt(index);
          }
        }
  }
  // Submit handler
  onSubmit() {
     if (this.propertyForm.invalid) {
      return;  // Stop if form is invalid
    }
    if(this.propertyForm.valid){
      this.apartmentDdetailService.addApartment(this.propertyForm.value).subscribe({
        next: () => {
          this.propertyForm.reset(this.propertyForm.value);
          this.router.navigate(['/']);
          alert("Post Created Successfully")
        },
        error: (err) => {
          alert("post not created")
        },
      });
    }   
}
previewForm(){
    if (this.propertyForm.valid) {
      this.previewData = { ...this.propertyForm.value }; // Create a preview object
    } else {
      alert('Please fill out the form correctly');
    }
  }
clearPreview() {
    this.previewData = null;
  }

}
