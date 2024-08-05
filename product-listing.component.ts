import { MaterialModule } from '../../shared/material.module';
import { APIService } from '../../services/api.service';
import { MatSort } from '@angular/material/sort';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { ProductListing } from '../../shared/product-listing';



@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements AfterViewInit, OnInit {
  dataSource = new MatTableDataSource<ProductListing>();
  showColumns: string[] = ['image', 'name', 'price','brand', 'productTypeName', 'description'];
  constructor(private apiService: APIService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchProducts(event: Event) {
    const searchPrompt = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchPrompt.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnInit(): void {
    this.apiService.fetchProducts().subscribe((products:any) => {this.dataSource.data = products});
  }


}
