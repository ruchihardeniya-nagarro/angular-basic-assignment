import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  imports: [CommonModule],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss'
})
export class ImageSliderComponent {
  currentIndex = 0;
  @Input()
  apartmentImages!: any[] | undefined;


  nextImage() {
    if(this.apartmentImages){
      this.currentIndex = (this.currentIndex + 1) % this.apartmentImages.length;
    }
  }

  prevImage() {
    if(this.apartmentImages){
      this.currentIndex = (this.currentIndex - 1 + this.apartmentImages.length) % this.apartmentImages.length;
    }
  }
}
