import { Component } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PreviewImageComponent } from '../../loan-creation/gold-info/preview-image/preview-image.component';
import { TermsConditionComponent } from 'src/app/layouts/terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from 'src/app/layouts/privacy-policy/privacy-policy.component';
import { AppGlobals } from 'src/app/src/app/core/globals/app-globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})

export class LoginComponent {
  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  // set the current year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;
  imageUrl: string = "assets/images/banner-popup.jpg";


  isShowLoginForm: boolean = true;

  constructor(public formBuilder: UntypedFormBuilder, private _router: Router, private toastr: ToastrService, public _globals: AppGlobals, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
    // this.openWelcomePopup();
  }

  // openWelcomePopup(): void {
  //   const dialogRef = this.dialog.open(PreviewImageComponent, {
  //     width: '800px',
  //     height: 'auto',
  //     data: {
  //       imageUrl: this.imageUrl,
  //       showTitle: false,
  //     },
  //   });

  // After a certain duration, close the popup (e.g., after 5 seconds)
  // setTimeout(() => {
  //   dialogRef.close();
  // }, 3000); // 5000 milliseconds = 5 seconds
  // }

  // Get form fields
  get f() {
    return this.loginForm.controls;
  }

  //On Form Submit 
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.validateAllFormFields(this.loginForm)
    }
  }

  //On sign in
  signIn() {
    const userName = this.loginForm.value.username;
    const passwd = this.loginForm.value.password;

    if (this.loginForm.valid) {
      if (userName == 'FZ00295' && passwd == '12345') {
        this.toastr.success('Welcome Admin')
        this._router.navigate(["./home/dashboard"]);
        sessionStorage.setItem("loggedIn", "true");

      }
      else {
        this.toastr.error('Please Enter valid Username and Password!', 'Failed')
      }
    }
  }


  //on submit validate fields
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  //Password hide and show
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  // openTermsModal(value: string) {
  //   if (value == 'terms') {
  //     const dialogRef = this.dialog.open(TermsConditionComponent,
  //     );
  //   }
  //   else if (value == 'privacy') {
  //     const dialogRef = this.dialog.open(PrivacyPolicyComponent,
  //     );
  //   }
  // }
  openTermsModal(value: string) {
    if (value == 'terms') {
      const dialogRef = this.dialog.open(TermsConditionComponent,
        {
          autoFocus: false,
        });
    }
    else if (value == 'privacy') {
      const dialogRef = this.dialog.open(PrivacyPolicyComponent,
        {
          autoFocus: false,
        });
    }
  }
}








