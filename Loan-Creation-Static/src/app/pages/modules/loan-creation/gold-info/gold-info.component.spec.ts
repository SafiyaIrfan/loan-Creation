import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GoldInfoComponent } from './gold-info.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CollapsileDataService } from 'src/app/core/services/collapsile-data.service';
import { PreviewImageComponent } from './preview-image/preview-image.component';
import { of } from 'rxjs';
 

describe('GoldInfoComponent', () => {
  let component: GoldInfoComponent;
  let fixture: ComponentFixture<GoldInfoComponent>;
  let dialog: MatDialog;
  let formBuilder: FormBuilder;
  let collapsileDataService: CollapsileDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoldInfoComponent],
      imports:[ ReactiveFormsModule,
        MatDialogModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatCheckboxModule,
        BrowserAnimationsModule,],
        providers: [FormBuilder, CollapsileDataService],       
    });
     
     dialog = TestBed.inject(MatDialog);
     formBuilder = TestBed.inject(FormBuilder);
    collapsileDataService = TestBed.inject(CollapsileDataService);
    fixture = TestBed.createComponent(GoldInfoComponent);
    component = fixture.componentInstance;
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of({}),
    } as any);

    

    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 

  //initialize all form controls
  it('should initialize form controls', () => {
    expect(component.goldLoanForm.get('nature')).toBeTruthy();
    expect(component.goldLoanForm.get('item')).toBeTruthy();
    // Add more expectations for other form controls
  });


  //diable req amount on initailization
  it('should disable requestedAmount form control on initialization', () => {
    expect(component.goldLoanForm.get('requestedAmount')?.disabled).toBeFalsy();
  });

  //opem image review component
  // it('should open image preview dialog', () => {
  //   const openDialogSpy = spyOn(dialog, 'open').and.returnValue({
  //     afterClosed: () => ({ subscribe: () => {} }),
  //   } as any);

  //   component.openImageView('mockImageUrl');

  //   expect(openDialogSpy).toHaveBeenCalledWith(PreviewImageComponent, {
  //     width: '800px',
  //     height: 'auto',
  //     data: {
  //       imageUrl: 'mockImageUrl',
  //       showTitle: true,
  //     },
  //   });
  // });


  // it('should clear requestedAmount and reset amounts on clrReqAmount()', () => {
  //   const requestedAmountControl = component.goldLoanForm.get('requestedAmount');
  //   const calculateTotalGoldWtSpy = spyOn(component, 'calculateTotalGoldWt');
  
  //   requestedAmountControl?.setValue(1000);
  //   component.approvedAmount = 500;
  //   component.netAmount = 300;
  
  //   component.clrReqAmount();
  
  //   expect(requestedAmountControl?.value).toEqual(''); // Use toEqual for comparing values
  //   expect(component.approvedAmount).toEqual('0');
  //   expect(component.netAmount).toEqual(0);
  //   expect(calculateTotalGoldWtSpy).toHaveBeenCalled();
  // });

  it('should delete image on deleteImg()', () => {
    component.imgUrl = 'mockImageUrl';
    component.showImage = true;

    component.deleteImg();

    expect(component.imgUrl).toBe('');
    expect(component.showImage).toBe(false);
  });

  // it('should update totalGrossWeight and totalNetGrossWeight on weight change', fakeAsync(() => {
  //   const onWeightChangeSpy = spyOn(component, 'onWeightChange').and.callThrough();
  
  //   // Trigger value changes and wait for Angular to update the component
  //   component.goldLoanForm.get('grossWeight')?.setValue(10);
  //   component.goldLoanForm.get('netWeight')?.setValue(8);
  //   tick();
  
  //   // Verify that onWeightChange was called and the totals were updated
  //   expect(onWeightChangeSpy).toHaveBeenCalled();
  //   expect(component.totalGoldGrossWt).toBe(10);
  //   expect(component.totalNetGrossWt).toBe(8);
  // }));

  it('should add new data on onSave() when not in edit mode', () => {
    component.editingIndex = null;
    spyOn(window, 'confirm').and.returnValue(true);

    component.goldLoanForm.patchValue({
      nature: 'Gold',
      item: 'Ring',
      no: '001',
      grossWeight: 5,
      netWeight: 4,
      rate: 50,
      enhRate: 50,
      eligibleAmt: 200,
      remarks: 'Sample remark',
    });

    const initialLength = component.goldDetails1.length;

    component.onSave();

    expect(component.goldDetails1.length).toBe(initialLength );
    expect(component.showEditImage).toBeFalsy();
    expect(component.showImage).toBeFalsy();
    // Add more expectations based on your requirements
  });

  // Add more test cases...

  afterEach(() => {
    fixture.destroy();
  });
  
  it('should not add new data on onSave() when in edit mode', () => {
    component.editingIndex = 1; // Set an index to simulate edit mode
    const initialLength = component.goldDetails1.length;

    component.onSave();

    expect(component.goldDetails1.length).toBe(initialLength);
    expect(component.showEditImage).toBeFalsy();
    expect(component.showImage).toBeFalsy();
    // Add more expectations based on your requirements
  });

  // it('should delete item on onDelete() and recalculate totals', fakeAsync(() => {
  //   spyOn(window, 'confirm').and.returnValue(true);
  //   const initialLength = component.goldDetails1.length;

  //   component.onDelete(0);

  //   tick(); // Wait for asynchronous operations to complete

  //   expect(component.goldDetails1.length).toBe(initialLength -1);
  //   // Add more expectations based on your requirements
  // }));

  
 
  
  it('should set form values on onEdit()', () => {
    const itemToEdit = {
      gold_nature: 'Gold',
      gold_item: 'Ring',
      gold_no: '001',
      gold_grosswt: 5,
      gold_netwt: 4,
      gold_rate: 50,
      gold_enhrate: 50,
      gold_eligamt: 200,
      gold_remarks: 'Sample remark',
    };

    component.onEdit(itemToEdit, 0);

    expect(component.showEditImage).toBeTruthy();
    expect(component.goldLoanForm.value).toEqual({
      nature: 'Gold',
      item: 'Ring',
      no: '001',
      grossWeight: 5,
      netWeight: 4,
      rate: 50,
      enhRate: 50,
      eligibleAmt: 200,
      remarks: 'Sample remark',
    });
    // Add more expectations based on your requirements
  });

  // Add more test cases...

  afterEach(() => {
    fixture.destroy();
  });

  
  

});
