import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { CreateUpdateProductBody, Product } from '../../services/product.dto';
import { NullableForm } from '../../../../core/shared/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-update-product-dialog',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-update-product-dialog.component.html',
  styleUrl: './create-update-product-dialog.component.scss'
})
export class CreateUpdateProductDialogComponent {
  @Input() isEdit: boolean = false;
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
    });
    if (this.dialogData) {
      this.productForm.patchValue(this.dialogData)
    }
  }

  onSave() {
    const { id, ...values } = this.productForm.value;
    const payload = {
      ...values
    } as CreateUpdateProductBody;
    const observable = this.isEdit
      ? this.productService.updateProduct(id as string, payload)
      : this.productService.createProduct(payload);
    observable.subscribe({
      next: () => this.dialogRef.close(true),
      error: () => this.dialogRef.close(false)
    })
  }
}
