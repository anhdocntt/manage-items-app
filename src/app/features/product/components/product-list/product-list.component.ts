import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product } from '../../services/product.dto';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateProductDialogComponent } from '../create-update-product-dialog/create-update-product-dialog.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [MatTableModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  dataSource = new MatTableDataSource<Product>([]);
  dataSourceFiltered = new MatTableDataSource<Product>([]);
  displayedColumns: string[] = [
    "name",
    "type",
    "category",
    "price",
    "action",
  ];
  searchText: string = "";

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  private getAllProduct() {
    this.productService.getAllProduct().subscribe(res => {
      this.dataSource.data = res;
      this.dataSourceFiltered.data = res;
    })
  }

  openAddProductDialog() {
    const dialogRef = this.dialog.open(CreateUpdateProductDialogComponent, {
      autoFocus: false,
      panelClass: 'form-dialog',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(res => {
      if (!res) return;
      this.getAllProduct();
    });
  }

  openEditProductDialog(product: Product) {
    const dialogRef = this.dialog.open(CreateUpdateProductDialogComponent, {
      autoFocus: false,
      panelClass: 'form-dialog',
      disableClose: true,
      data: product
    });
    dialogRef.componentInstance.isEdit = true;
    dialogRef.afterClosed().subscribe(res => {
      if (!res) return;
      this.getAllProduct();
    });
  }

  removeProduct(id: string) {
    this.productService.softDeleteProduct(id).subscribe(() => this.getAllProduct());
  }

  onSearchChange() {
    const dataFiltered = this.dataSource.data.filter(v => v.name.toLowerCase().trim().includes(this.searchText?.toLowerCase().trim()));
    this.dataSourceFiltered.data = dataFiltered;
  }
}
