import { Component, OnInit } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ApartmentDetailService } from '../service/apartment-detail.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ImageSliderComponent } from "../image-slider/image-slider.component";
import { Route } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [HttpClientModule, MatCardModule, MatButtonModule, CommonModule,ImageSliderComponent],
  providers:[ApartmentDetailService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
apartments: any[] = [];
latestAddedApartment:any={}
constructor( private apartService:ApartmentDetailService,private router:Router){}
   
ngOnInit(){
  this.getApartmentList();
}

  getApartmentList(){
    this.apartService.getApartments().subscribe((data)=>{
      this.apartments = data;
      this.latestAddedApartment = data?data[0]:[];
    })
  }

   getItemPairs(arr: any[]) {
    let pairs: any[][] = [];
    if(arr.length>0){
      for (let i = 0; i < arr.length; i += 2) {
            pairs.push(arr.slice(i, i + 2)); // Slice array in pairs of 2
          }
          return pairs;
        }
        return pairs;

    }
    viewDetailClicked(id:number|string){
        this.router.navigate(['/apartment-detail', id ]);
    }

    markAsFavorite(apartment:any){

    }

   
}
