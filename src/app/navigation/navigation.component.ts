import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  imports: [ RouterLink, RouterLinkActive,CommonModule],
  providers:[AuthService],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  constructor(
    private authService:AuthService
  ){}
  showlogin:boolean = false
  logout(){
    this.authService.logout();
  }
  ngOnInit(){
  }
  isLoggedIn(){
    const user = this.authService.getUser();
    if(user){
      return true
    }
    return false;
  }

  

}
