import { Component, OnInit, signal } from '@angular/core';
import { ApartmentDetailService } from '../service/apartment-detail.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';  // Import necessary modules
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,MatFormFieldModule, MatInputModule,MatButtonModule,HttpClientModule],
  providers:[AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = signal('');

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router:Router
  ) { } 
 ngOnInit(): void {
    // Initialize the form with default values and validation
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],  // Username validation
      password: ['', [Validators.required, Validators.minLength(6)]],  // Password validation
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;  // Stop if form is invalid
    }

    const { username, password } = this.loginForm.value;
    console.log(" 1username, 2password", username, password)
    if(this.username && this.password){
      this.authService.login(username, password).subscribe((user)=>{
        console.log("user",user)
        if(user?.length>0){
          this.authService.setUser(user[0]);
          this.router.navigate(['/']);
        }else {
          alert('Invalid credentials');
        }
      }
    );
    }
  }

  // Getters to access the form controls easily
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
  updateErrorMessage() {
    if (this.username?.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.username?.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

}

