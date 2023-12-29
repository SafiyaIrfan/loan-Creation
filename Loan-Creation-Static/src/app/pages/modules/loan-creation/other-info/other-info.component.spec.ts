import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherInfoComponent } from './other-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import { By } from '@angular/platform-browser';

describe('OtherInfoComponent', () => {
  let component: OtherInfoComponent;
  let fixture: ComponentFixture<OtherInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherInfoComponent],
      imports: [
        RouterTestingModule,FormsModule, ReactiveFormsModule,FlatpickrModule,
        BrowserAnimationsModule,RouterModule.forChild([]) ,

      ], 
      providers:[FlatpickrDefaults]
    });
    fixture = TestBed.createComponent(OtherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should initialize form controls and static data', () => {
    expect(component.otherInfoForm).toBeDefined();
    expect(component.ownerShipOfGold.length).toBeGreaterThan(0);
    expect(component.possessedBy.length).toBeGreaterThan(0);
    expect(component.ownerRelation.length).toBeGreaterThan(0);
    expect(component.supplierData.length).toBeGreaterThan(0);
    expect(component.packetData.length).toBeGreaterThan(0);
  });

  it('should have required form controls', () => {
    const form = component.otherInfoForm;
    expect(form.get('ownerShipOfGold')).toBeTruthy();
    expect(form.get('possessedBy')).toBeTruthy();
    expect(form.get('relationShipWith')).toBeTruthy();
    expect(form.get('netWeight')).toBeTruthy();
    expect(form.get('date')).toBeTruthy();
    expect(form.get('packet')).toBeTruthy();
    expect(form.get('serialNo')).toBeTruthy(); 
  });

  
  it('should populate dropdown options with proper values', () => {
    // Assuming you have access to the component's properties, you can access the dropdown data
    const ownerShipOfGoldOptions = component.ownerShipOfGold;
    const possessedByOptions = component.possessedBy;
    const ownerRelationOptions = component.ownerRelation;
    const supplierDataOptions = component.supplierData;
    const packetDataOptions = component.packetData;

    // Check that the dropdown options are not empty and contain the expected values
    expect(ownerShipOfGoldOptions).toBeTruthy();
    expect(ownerShipOfGoldOptions.length).toBeGreaterThan(0);

    expect(possessedByOptions).toBeTruthy();
    expect(possessedByOptions.length).toBeGreaterThan(0);
    // Add checks for possessedBy dropdown

    expect(ownerRelationOptions).toBeTruthy();
    expect(ownerRelationOptions.length).toBeGreaterThan(0);
    // Add checks for ownerRelation dropdown

    expect(supplierDataOptions).toBeTruthy();
    expect(supplierDataOptions.length).toBeGreaterThan(0);
    // Add checks for supplierData dropdown

    expect(packetDataOptions).toBeTruthy();
    expect(packetDataOptions.length).toBeGreaterThan(0);
    // Add checks for packetData dropdown
  });



  //
  it('should prevent users from entering a future date', () => {
    const form = component.otherInfoForm;

    // Assuming you have a date control named 'date' in your form
    const dateControl = form.get('date')!;

    // Set the current date as the maximum allowed date
    const currentDate = new Date();
    dateControl.setValidators([preventFutureDateValidator(currentDate)]);

    // Attempt to set a future date
    dateControl.setValue(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate()));

    // Trigger validation
    dateControl.updateValueAndValidity();

    // Check that the form control is invalid
    expect(dateControl.valid).toBe(false);
  });
});

// Custom validator function to prevent future dates
function preventFutureDateValidator(maxDate: Date) {
  return (control: { value: any; }) => {
    const selectedDate = control.value;

    if (selectedDate > maxDate) {
      return { futureDate: true }; // You can define a custom error key 'futureDate'
    }

    return null;
  };


   
};
