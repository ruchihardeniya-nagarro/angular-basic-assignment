import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ApartmentDetailService } from '../service/apartment-detail.service';
import { ActivatedRoute } from '@angular/router';
import { apartment } from '../interface/apartment.models';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { User } from '../interface/user.models';

@Component({
  selector: 'app-view-apartment-detail',
  imports: [MatCardModule, MatButtonModule, CommonModule, HttpClientModule, ImageSliderComponent, AngularMaterialModule, ReactiveFormsModule],
  templateUrl: './view-apartment-detail.component.html',
  providers: [ApartmentDetailService, AuthService],
  styleUrl: './view-apartment-detail.component.scss'
})
export class ViewApartmentDetailComponent implements OnInit,AfterViewInit {
  constructor(
    private apartService: ApartmentDetailService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
    private userService :UserService
  ) { }
  apartmentDetail!: apartment;
  commentForm!: FormGroup;
  isFav: boolean | undefined;
  isLoggedIn: boolean | undefined;
  userDetail!: User;
  ngOnInit() {
    this.getApartmentdetail();
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required]],  // Username validation
    });
    let user = JSON.parse(this.authService.getUser());
    let userFav = user?.favorites;
    const apartmentId = +this.route.snapshot.paramMap.get('id')!;
    this.isLoggedIn= this.authService.isAuthenticated()
    this.isFav = user && userFav.includes(apartmentId);
    console.log("userFav",this.isFav)
    this.getUserData()
  }

  ngAfterViewInit(): void {
     
  }
  getApartmentdetail() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.apartService.getApartmentById(id).subscribe((data) => {
        this.apartmentDetail = data;
      })
    }
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.commentForm.invalid) {
      return;  // Stop if form is invalid
    }
    let user = JSON.parse(this.authService.getUser());
    const apartmentId = +this.route.snapshot.paramMap.get('id')!;
    const { comment } = this.commentForm.value;
    if (user) {
      this.apartService.addComment(apartmentId, user.id, comment).subscribe({
        next: () => {
          this.getApartmentdetail();
          this.commentForm.reset(this.commentForm.value);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  addToFavorites(): void {
    let user = JSON.parse(this.authService.getUser());
    let userId = user?.id;
    const apartmentId = +this.route.snapshot.paramMap.get('id')!;

    this.apartService.addApartmentToFavorites(userId, apartmentId).subscribe(
      (updatedUser) => {
        console.log('Apartment added to favorites:', updatedUser);
        this.getUserData();

      },
      (error) => {
        console.error('Error adding apartment to favorites:', error);
      }
    );
  }
  removeFromFav() { 
    let user = JSON.parse(this.authService.getUser());
    let userId = user?.id;
    const apartmentId = +this.route.snapshot.paramMap.get('id')!;

    this.apartService.removeApartmentFromFav(userId, apartmentId).subscribe(
      (updatedUser) => {
        console.log('Apartment removed to favorites:', updatedUser);
        this.getUserData();
      },
      (error) => {
        console.error('Error adding apartment to favorites:', error);
      }
    );
  }


  isApartmentAddedToFavorite(apartmentId: string | number) {
    if (apartmentId && this.userDetail.favorites.includes(apartmentId.toString())) { 
      return true
    }
    return false
  }

  getUserData() { 
    let user = JSON.parse(this.authService.getUser());
    let userId = user?.id;
    if (userId) {
      this.userService.getUserById(userId).subscribe((data) => {
        this.userDetail = data;
        console.log("userData",this.userDetail)
      })
    }
  }


}
