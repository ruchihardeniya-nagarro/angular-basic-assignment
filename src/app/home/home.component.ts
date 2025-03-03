import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ApartmentDetailService } from '../service/apartment-detail.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ImageSliderComponent } from "../image-slider/image-slider.component";
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { User } from '../interface/user.models';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
@Component({
  selector: 'app-home',
  imports: [HttpClientModule, MatCardModule, MatButtonModule, CommonModule, ImageSliderComponent,FormsModule,AngularMaterialModule],
  providers: [ApartmentDetailService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  apartments: any[] = [];
  latestAddedApartment: any = {};
  isFav: boolean | undefined;
  isLoggedIn: boolean | undefined;
  filterText: string | undefined;
  filteredApartments : any[] = [];
  searchList: string[] = ['address', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(
    private apartService: ApartmentDetailService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private uesrService: UserService
  ) { }
  userDetail!: User;

  ngOnInit() {
    this.getApartmentList();
    let user = JSON.parse(this.authService.getUser());
    this.isLoggedIn = this.authService.isAuthenticated()
    this.getUserData()
  }
 
  getApartmentList() {
    this.apartService.getApartments().subscribe((data) => {
      this.apartments = data;
      this.latestAddedApartment = data ? data[0] : [];
      this.filteredApartments = data;
    })
  }

  onChange() {
    console.log("filterText",this.filterText)
    if (this.filterText) {
      this.apartService.searchApartmentByArea(this.filterText).subscribe(apartments => {
        this.apartments = apartments;
        this.latestAddedApartment =  [];
      });
    } else {
      this.getApartmentList(); // If no search query, show all authors
    }
  }

  clearSearch() { 
    this.filterText = "";
    this.getApartmentList(); // If no search query, show all authors

  }

  getItemPairs(arr: any[]) {
    let pairs: any[][] = [];
    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i += 2) {
        pairs.push(arr.slice(i, i + 2)); // Slice array in pairs of 2
      }
      return pairs;
    }
    return pairs;

  }
  viewDetailClicked(id: number | string) {
    this.router.navigate(['/apartment-detail', id]);
  }

  
  addToFavorites(apartmentId:number|string): void {
    let user = JSON.parse(this.authService.getUser());
    let userId = user?.id;
    this.apartService.addApartmentToFavorites(userId, apartmentId).subscribe(
      (updatedUser) => {
        // this.apartService.updatedUserArray(updatedUser);
        this.getUserData();
        console.log('Apartment added to favorites:', updatedUser);
      },
      (error) => {
        console.error('Error adding apartment to favorites:', error);
      }
    );
  }
  removeFromFav(apartmentId:number|string) {
    let user = JSON.parse(this.authService.getUser());
    let userId = user?.id;
    this.apartService.removeApartmentFromFav(userId, apartmentId).subscribe(
      (updatedUser) => {
        this.apartService.updatedUserArray(updatedUser)
        console.log('Apartment removed to favorites:', updatedUser);
        this.getUserData();
      },
      (error) => {
        console.error('Error adding apartment to favorites:', error);
      }
    );
  }

  isApartmentAddedToFavorite(apartmentId: string | number) {
    // this.getUserData();
    if (apartmentId && this.userDetail.favorites.includes(apartmentId.toString())) { 
      return true
    }
    return false
  }

  getUserData() { 
    let user = JSON.parse(this.authService.getUser());
    let userId = user?.id;
    if (userId) {
      this.uesrService.getUserById(userId).subscribe((data) => {
        this.userDetail = data;
        console.log("userData",this.userDetail)

      })
    }
  }

}
