import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetailsComponent } from './payment-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapsileDataService } from 'src/app/core/services/collapsile-data.service';
import { of } from 'rxjs';

describe('PaymentDetailsComponent', () => {
  let component: PaymentDetailsComponent;
  let fixture: ComponentFixture<PaymentDetailsComponent>;
  let collapsibleDataService: CollapsileDataService;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      declarations: [PaymentDetailsComponent],
      imports: [
       FormsModule, ReactiveFormsModule, 
        BrowserAnimationsModule, 
      ], 
      providers:[CollapsileDataService]
    });
    fixture = TestBed.createComponent(PaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required controls', () => {
    expect(component.otherLoanInfo).toBeDefined();
    expect(component.otherLoanInfo.get('paymentMode')).toBeDefined();
    expect(component.otherLoanInfo.get('accNumber')).toBeDefined();
    expect(component.otherLoanInfo.get('ifscCode')).toBeDefined();
    expect(component.otherLoanInfo.get('cash')).toBeDefined();
    expect(component.otherLoanInfo.get('branch')).toBeDefined();
    // Add similar expectations for other form controls
  });

  it('should disable certain form controls on ngOnInit', () => {
    expect(component.otherLoanInfo.controls['bank'].disabled).toBeTrue();
    expect(component.otherLoanInfo.controls['accNumber'].disabled).toBeTrue();
    expect(component.otherLoanInfo.controls['ifscCode'].disabled).toBeTrue();
    expect(component.otherLoanInfo.controls['bank'].disabled).toBeTrue();
    expect(component.otherLoanInfo.controls['cash'].disabled).toBeTrue();

    // Add similar expectations for other disabled controls
  });

  it('should handle onChangePayment event and update form controls accordingly', () => {
    const paymentId = 62; // Direct credit payment mode
    component.otherLoanInfo.get('paymentMode')?.setValue(paymentId);
    component.onChangePayment();

    expect(component.otherLoanInfo.controls['bank'].enabled).toBeTrue();
    expect(component.otherLoanInfo.controls['accNumber'].enabled).toBeTrue();
    // Add similar expectations for other enabled controls and values
  });

  it('should disable certain form controls when payment mode is 47 or 64', () => {
    component.otherLoanInfo.get('paymentMode')?.setValue(47); // Assuming 47 corresponds to a specific payment mode
    component.onChangePayment();

    expect(component.otherLoanInfo.controls['bank'].disabled).toBeTrue();
    expect(component.otherLoanInfo.controls['accNumber'].disabled).toBeTrue();
    // Add similar expectations for other disabled controls
  });

  

  it('should update form controls when bank is changed', () => {
    const selectedBank = { id: 1, bankName: 'Test Bank', ifscCode: 'TEST123', branchName: 'Test Branch' };

    component.otherLoanInfo.get('bank')?.setValue(selectedBank.id);
    component.onChangeBank();

    expect(component.otherLoanInfo.get('ifscCode')?.value).toBe('');
    expect(component.otherLoanInfo.get('branch')?.value).toBe('');
    expect(component.otherLoanInfo.get('accNumber')?.value).toBe('');
  });
 

  it('should display the Total Charges section with the correct values', () => {
    const charges = 50;
    component.charges = charges;
    fixture.detectChanges();

    const totalChargesElement = fixture.nativeElement.querySelector('.col-lg-3:nth-child(3) .fs-18.text-warning');
    
    // Expectations
    expect(totalChargesElement).toBeTruthy(); // Ensure the element is present
    expect(totalChargesElement.textContent.trim()).toBe(`₹${charges.toFixed(2)}/-`);
  });
  

  

  
  
});
