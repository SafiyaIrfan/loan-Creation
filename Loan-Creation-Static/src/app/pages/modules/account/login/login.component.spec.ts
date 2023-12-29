import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from 'src/app/layouts/footer/footer.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: any;
  let mockToastrService: ToastrService; // Corrected declaration


  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']); // Corrected initialization

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule,MatDialogModule,NgbCarousel,FooterComponent, ToastrModule.forRoot({
        preventDuplicates: true,
      }),],
      providers: [
        FormBuilder,
        {provide:Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToastrService  },
        MatDialog
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockRouter = TestBed.inject(Router);
    mockToastrService = TestBed.inject(ToastrService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Ensure that the login form is valid
  it('should have a valid login form', () => {
    expect(component.loginForm instanceof FormGroup).toBe(true);
    expect(component.loginForm.controls['username']).toBeTruthy();
    expect(component.loginForm.controls['password']).toBeTruthy();
  });

//Ensure that the password field visibility can be toggled
  it('should toggle the password field visibility', () => {
    const initialVisibility = component.fieldTextType;

    component.toggleFieldTextType();
    const afterToggleVisibility = component.fieldTextType;

    expect(afterToggleVisibility).not.toBe(initialVisibility);
  });

  //Ensure an error message is displayed and no navigation occurs when the form is submitted with invalid input.
  it('should show error message and not navigate with invalid form submission', () => {
    component.onSubmit();

    expect(component.submitted).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  //Ensures that, upon providing valid credentials, the form is valid and the component navigates to the expected route ('./home/dashboard').
  it('should navigate on successful login', () => {
    const validUsername = 'FZ00295';
    const validPassword = '12345';

    component.loginForm.setValue({ username: validUsername, password: validPassword });

    component.signIn();

    expect(component.loginForm.valid).toBe(true);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['./home/dashboard']);
  });


});
