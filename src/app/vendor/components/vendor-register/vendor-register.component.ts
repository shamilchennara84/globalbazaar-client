import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,

  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-vendor-register',
  templateUrl: './vendor-register.component.html',
  styleUrl: './vendor-register.component.scss',
})
export class VendorRegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  hide = signal(true);
  hideCfm = signal(true);
  registrationSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.initializeRegisterForm();
    console.log(this.registerForm);
  }

  private initializeRegisterForm(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(8)]],
        companyName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatch('password', 'confirmPassword'),
      }
    );
  }

  getControl(name: string): AbstractControl | null {
    return this.registerForm.get(name);
  }

  passwordMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName],
        matchingControl = formGroup.controls[matchingControlName];
      if (control.value.length > 0 && matchingControl.value.length > 0) {
        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ passwordMatch: true });
        } else if (
          matchingControl.errors &&
          !matchingControl.errors['passwordMatch']
        ) {
          return;
        } else if (control.value == matchingControl.value) {
          matchingControl.setErrors(null);
        }
      }
    };
  }

  proceedRegister(): void {
    if (this.registerForm.valid) {
      const credentials = this.registerForm.value;
      this.registrationSubscription = this.authService
        .signupVendor(credentials)
        .subscribe({
          next: () => {
            this.toastr.success('Vendor registration successful!', 'Success');
            this.registerForm.reset();
          },
          error: () => {
            this.toastr.error(
              'registration failed. Please try again.',
              'Error'
            );
          },
        });
    }
  }

  togglePasswordVisibility(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  toggleConfirmPasswordVisibility(event: MouseEvent) {
    this.hideCfm.set(!this.hideCfm());
    event.stopPropagation();
  }



  ngOnDestroy(): void {
    if (this.registrationSubscription) {
      this.registrationSubscription.unsubscribe();
    }
  }
}
