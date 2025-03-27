import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product } from '../../services/product.dto';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateProductDialogComponent } from '../create-update-product-dialog/create-update-product-dialog.component';

@Component({
  selector: 'app-product-list',
  imports: [MatTableModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  dataSource = new MatTableDataSource<Product>([]);
  displayedColumns: string[] = [
    "name",
    "type",
    "category",
    "price",
    "image",
    "action",
  ];

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
    })
  }

  openAddProductDialog() {
    const dialogRef = this.dialog.open(CreateUpdateProductDialogComponent, {
      autoFocus: false,
      panelClass: 'form-dialog',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(res => {
    });
  }

  openEditProductDialog(product: Product) {
    const dialogRef = this.dialog.open(CreateUpdateProductDialogComponent, {
      autoFocus: false,
      panelClass: 'form-dialog',
      disableClose: true,
      data: product
    });
    dialogRef.afterClosed().subscribe(res => {
    });
  }

  removeProduct(id: string) {
  }
}
