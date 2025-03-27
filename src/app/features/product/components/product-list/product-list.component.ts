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
    const res = [
      {
        "name": "Item 1 new",
        "type": "Type A",
        "category": 0,
        "price": 10.49,
        "images": "https://placehold.co/200x200",
        "isDeleted": true,
        "id": "1"
      },
      {
        "id": "2",
        "name": "Item 2",
        "type": "Type B",
        "category": 1,
        "price": 15.49,
        "images": null,
        "isDeleted": false
      },
      {
        "id": "3",
        "name": "Item 3",
        "type": "Type A",
        "category": 2,
        "price": 20,
        "images": null,
        "isDeleted": false
      },
      {
        "id": "4",
        "name": "Item 4",
        "type": "Type C",
        "category": 0,
        "price": 5.75,
        "images": null,
        "isDeleted": false
      },
      {
        "id": "5",
        "name": "Item 5",
        "type": "Type B",
        "category": 1,
        "price": 12.3,
        "images": "https://placehold.co/300x200",
        "isDeleted": false
      },
      {
        "id": "7fa1"
      },
      {
        "id": "1c3d",
        "name": "Item 1",
        "type": "Type A",
        "category": 0,
        "price": 10.49,
        "images": "https://placehold.co/200x200",
        "isDeleted": false
      },
      {
        "id": "750d",
        "name": "Item 1",
        "type": "Type A",
        "category": 0,
        "price": 10.49,
        "images": "https://placehold.co/200x200"
      }
    ] as unknown as any
    this.dataSource.data = res;
    // this.productService.getAllProduct().subscribe(res => {
    //   this.dataSource.data = res;
    // })
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
}
