import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { Product } from '../../services/product.dto';
import { NullableForm } from '../../../../core/shared/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-update-product-dialog',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-update-product-dialog.component.html',
  styleUrl: './create-update-product-dialog.component.scss'
})
export class CreateUpdateProductDialogComponent {
  productForm: FormGroup<NullableForm<Product>>;

  constructor(
    fb: FormBuilder,
    protected readonly dialogRef: MatDialogRef<CreateUpdateProductDialogComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) protected readonly dialogData?: Product
  ) {
    this.productForm = fb.group<NullableForm<Product>>({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      type: new FormControl(null),
      price: new FormControl(null, [Validators.required, Validators.min(0)]),
      image: new FormControl(null),
    });
    if (this.dialogData) {
      this.productForm.patchValue(this.dialogData)
    }
  }

  onSave() {

  }
}
