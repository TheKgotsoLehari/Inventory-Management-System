import { MaterialModule } from '../../shared/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { APIService } from '../../services/api.service';






@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})





export class RegisterComponent implements OnInit {

  formRegister: FormGroup = this.buildForm.group({
    emailaddress: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
  })





  constructor(private redirect: Router, private buildForm: FormBuilder, private apiService: APIService, private snackBar: MatSnackBar) { 

    
  }














  ngOnInit(): void {
  }

  userRegistered() {
    if (this.formRegister.valid) {
      this.apiService.userRegistered(this.formRegister.value).subscribe({
        next: () => {
          this.formRegister.reset();
          this.redirect.navigate(['login']).then(navigated => {
            if (navigated) {
              this.snackBar.open('Registered successfully', 'X', { duration: 5000 });
            }
          });
        },
        error: (response: HttpErrorResponse) => {
          if (response.status === 403) {
            this.snackBar.open(response.error, 'X', { duration: 5000 });
          } else if (response.status === 500) {
            this.snackBar.open('Internal server error. Please try again later.', 'X', { duration: 5000 });
          } else {
            this.snackBar.open('Registration failed. Please try again.', 'X', { duration: 5000 });
          }
        }
      });
    }
  }

}
