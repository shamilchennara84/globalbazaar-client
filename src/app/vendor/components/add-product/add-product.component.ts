import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../core/services/product.service';

interface newProduct {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit {
  productCreateForm!: FormGroup;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toaster: ToastrService,
    private dialog: MatDialogRef<AddProductComponent>
  ) {}

  ngOnInit(): void {
    this.initializeCreateForm();
  }

  initializeCreateForm() {
    this.productCreateForm = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      quantity: new FormControl('', [Validators.required, Validators.min(0)]),
      image: [''],
    });
  }

  getImageFullUrl() {
    if (this.selectedImage) {
      return URL.createObjectURL(this.selectedImage);
    }
    return '/assets/product-placeholder.png';
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.selectedImage = file;
      this.productCreateForm.controls['image'].setValue(file);
    }
  }
  createProduct() {
    if (this.productCreateForm.valid) {
      const newProduct: newProduct = this.productCreateForm.value;
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price.toString());
      formData.append('quantity', newProduct.quantity.toString());

      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }
      this.productService.createProduct(formData).subscribe({
        next: () => {
          this.toaster.success('Product created successfully');
          this.dialog.close();
        },
        error: (err) => {
          if (err.status === 400) {
            this.toaster.error('Validation error', err.error.message);
          } else {
            console.log(err);
            this.toaster.error('Failed to create product');
          }
        },
      });
    } else {
      this.toaster.warning('Please provide valid data');
    }
  }
}
