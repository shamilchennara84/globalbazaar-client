import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-login',
  templateUrl: './vendor-login.component.html',
  styleUrl: './vendor-login.component.scss',
})
export class VendorLoginComponent implements OnInit, OnDestroy {
  signInForm!: FormGroup;
  hide = signal(true);
  signInSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.initializeSignInForm();
  }

  private initializeSignInForm(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  getControl(name: string): AbstractControl | null {
    return this.signInForm.get(name);
  }

  proceedSignIn(): void {
    if (this.signInForm.valid) {
      const credentials = this.signInForm.value;
      this.signInSubscription = this.authService
        .signInVendor(credentials)
        .subscribe({
          next: () => {
            this.toastr.success('Login successful!', 'Success');
             this.router.navigate(['/vendor', 'dashboard']);
          },
          error: (err) => {
            let errorMessage = 'Sign-in failed. Please try again.';
            if (err && err.error) {
              errorMessage = err.error.message;
            }
            this.toastr.error(errorMessage, 'Error');
          },
        });
    }
  }

  togglePasswordVisibility(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    if (this.signInSubscription) {
      this.signInSubscription.unsubscribe();
    }
  }
}
