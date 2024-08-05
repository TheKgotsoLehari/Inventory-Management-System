import { MaterialModule } from '../../shared/material.module';
import { Brands } from '../../shared/brands';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIService } from '../../services/api.service';
import { ProductTypes } from '../../shared/product-types';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-products',
  standalone:true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {


   productTypesData:ProductTypes[]=[]
   brandsData:Brands[]=[]
   fileName = ''
   populatedValues = new FormData();


  formProduct: FormGroup = this.buildForm.group({
    name: ['', Validators.required],
    file: ['', Validators.required],
    price: ['', Validators.required],
    brand: [null, Validators.required],
    producttype: [null, Validators.required],
    description: ['', Validators.required]
  })

  constructor( private redirect: Router,private apiService: APIService, private buildForm: FormBuilder, private popUp: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchBrands()
    this.fetchProductTypes()
  }

fetchBrands(){
  this.apiService.fetchBrands().subscribe(result => {
    let brandList:any[] = result
    brandList.forEach((element) => {
      this.brandsData.push(element)
    });
  });
}

fetchProductTypes(){
   this.apiService.fetchProductTypes().subscribe(result => {
    let productTypeList:any[] = result
    productTypeList.forEach((element) => {
      this.productTypesData.push(element)
    });
  });
}





  removeData(){
    this.populatedValues.delete("file");
    this.populatedValues.delete("name");
    this.populatedValues.delete("price");
    this.populatedValues.delete("description");
    this.populatedValues.delete("brand");
    this.populatedValues.delete("producttype");
  }


  onSubmit() {
    if(this.formProduct.valid)
    {
      this.populatedValues.append('name', this.formProduct.get('name')!.value);
      this.populatedValues.append('price', this.formProduct.get('price')!.value);
      this.populatedValues.append('description', this.formProduct.get('description')!.value);
      this.populatedValues.append('brand', this.formProduct.get('brand')!.value);
      this.populatedValues.append('producttype', this.formProduct.get('producttype')!.value);
      
      this.apiService.newProduct(this.populatedValues).subscribe(() => {
        this.removeData()
        this.redirect.navigateByUrl('productListing').then((navigated: boolean) => {
          if(navigated) {
            this.popUp.open(this.formProduct.get('name')!.value + ` created successfully`, 'X', {duration: 5000});
          }
       });
      });
    }
  }


  fileUploaded = (files: any) => {
    let uploadFile = <File>files[0];
    this.populatedValues.append('file', uploadFile, uploadFile.name);
    this.fileName = uploadFile.name
  }


}
