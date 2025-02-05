import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule, MatInputModule,MatSelectModule,ReactiveFormsModule,HttpClientModule,MatButtonModule],
  providers:[AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  errorMessage = signal('');

 constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router:Router
  ) { } 

  ngOnInit(): void {
    // Initialize the form with default values and validation
    this.registerForm = this.fb.group({
      username: ['', [Validators.required,]],  // Username validation
      password: ['', [Validators.required]],  // Password validation
      role: ['', [Validators.required]],  // Role validation

    });
  }
   onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, password,role } = this.registerForm.value;

      this.authService.register(username, password,role).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
  doSomething(event:any){
    console.log(event)
  }
}
