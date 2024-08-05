import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { APIService } from '../../services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[MaterialModule,
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    HttpClientModule, 
   ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']




})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = this.buildform.group({
    emailaddress: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })



 loadScreen:boolean = false
  constructor(private buildform: FormBuilder, private apiService: APIService,  private snackBar: MatSnackBar,private redirect: Router) { }





  


  ngOnInit(): void {
  }

  async userLogin(){
    if(this.formLogin.valid)
    {
      this.loadScreen = true

      await this.apiService.userLogin(this.formLogin.value).subscribe(result => {
        localStorage.setItem('User', JSON.stringify(result))
        this.formLogin.reset();
        this.redirect.navigateByUrl('productListing');
      })
    }
  }

}
