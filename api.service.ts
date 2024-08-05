import { LoginUser } from '../shared/login-user';
import { Observable, map, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../shared/user';
import { RegisterUser } from '../shared/register-user';
import { Product } from '../shared/product';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})




export class APIService {

apiUrl = 'http://localhost:5240/api/'

httpOptions ={
  headers: new HttpHeaders({
    ContentType: 'application/json'
  })



}


  constructor(private httpClient: HttpClient) 
  {

  }

  userLogin(loginUser: LoginUser){
    return this.httpClient.post<User>(`${this.apiUrl}Authentication/Login`, loginUser, this.httpOptions)


  }



  fetchProducts() {
    return this.httpClient.get(`${this.apiUrl}Store/ProductListing`)
    .pipe(map(result => result))
  }

 

  newProduct(file:FormData){
    
    return this.httpClient.post(`${this.apiUrl}Store/AddProduct`, file)
  }


  fetchProductTypes(): Observable<any>
  {
    return this.httpClient.get(`${this.apiUrl}Store/ProductTypes`)
    .pipe(map(result => result))
  }

  userRegistered(registerUser: RegisterUser){
    return this.httpClient.post(`${this.apiUrl}Authentication/Register`, registerUser, this.httpOptions)
  }


  fetchBrands(): Observable<any>
  {
    return this.httpClient.get(`${this.apiUrl}Store/Brands`)
    .pipe(map(result => result))
  }

 
}
