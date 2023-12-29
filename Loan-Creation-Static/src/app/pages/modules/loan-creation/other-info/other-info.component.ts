import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { ownerShipOfGold } from '../Static data/static';
import { possessedBy } from '../Static data/static';
import { ownerRelation } from '../Static data/static';
import { supplierData } from '../Static data/static';
import { packetData } from '../Static data/static';
import { canvassedByArray } from '../Static data/static';
import Swal from 'sweetalert2';



import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-other-info',
  templateUrl: './other-info.component.html',
  styleUrls: ['./other-info.component.scss']
})
export class OtherInfoComponent {
  ownerShipOfGold: any[] = [];
  possessedBy: any[] = [];
  ownerRelation: any[] = [];
  supplierData: any[] = [];
  packetData: any[] = [];
  canvassedBy: any[] = [];
  maxDate = new Date();
  biometric: boolean = false;
  eSign: boolean = false;
  otherInfoForm!: FormGroup;
  submitted = false;
  biometricLoader: boolean = false;
  eSignLoader: boolean = false;
  isScreenAbove1024 = false;
  // @ViewChild('firstInputField') firstInputField!: ElementRef;

  constructor(private formBuilder: FormBuilder, private renderer: Renderer2) {
    this.otherInfoForm = this.formBuilder.group({
      ownerShipOfGold: new FormControl('', [Validators.required]),
      possessedBy: new FormControl('', [Validators.required]),
      relationShipWith: new FormControl('', [Validators.required]),
      netWeight: new FormControl('', [Validators.required,]),
      date: new FormControl('', [Validators.required]),
      packet: new FormControl('', [Validators.required]),
      serialNo: new FormControl({ value: '', disabled: true }, [Validators.required,]),
      canvassedBy: new FormControl('', [Validators.required]),
      businessPromoter: new FormControl('', [Validators.required]),
    })
  }
  ngOnInit() {
    this.ownerShipOfGold = ownerShipOfGold;
    this.possessedBy = possessedBy;
    this.ownerRelation = ownerRelation;
    this.supplierData = supplierData;
    this.canvassedBy = canvassedByArray;
    this.packetData = packetData;
    this.otherInfoForm.controls['relationShipWith'].disable();
    this.otherInfoForm.controls['date'].disable();
    this.checkScreenResolution();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenResolution();
  }

  private checkScreenResolution(): void {
    const screenWidth = window.innerWidth;
    this.isScreenAbove1024 = screenWidth > 991 && screenWidth < 1370;

    if (this.isScreenAbove1024) {
      this.renderer.addClass(document.body, 'content');
    } else {
      this.renderer.removeClass(document.body, 'content');
    }
  }

  // ngAfterViewInit() {
  //   this.renderer.selectRootElement(this.firstInputField?.nativeElement).focus();
  // }

  // Function for changes in packet ||Ajay
  onSerialDropChange() {
    let packetId = this.otherInfoForm.get('packet')?.value;
    let randomSerialNo = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
    if (packetId == 1) {
      this.otherInfoForm.controls['serialNo'].setValue(randomSerialNo);
    }
    else if (packetId == 2) {
      this.otherInfoForm.controls['serialNo'].setValue(randomSerialNo);
    }
    else if (packetId == 3) {
      this.otherInfoForm.controls['serialNo'].setValue(randomSerialNo);
    }
    else if (packetId == '') {
      this.otherInfoForm.controls['serialNo'].setValue('');

    }

  }

  // Function for changes in Ownershipofgold || cuckoo
  onChangeOfOwner() {
    let ownerId = this.otherInfoForm.get('ownerShipOfGold')?.value;
    if (ownerId == 2) {
      this.otherInfoForm.controls['relationShipWith'].enable();
      this.otherInfoForm.controls['relationShipWith'].markAsTouched()
    }
    else if (ownerId == 1) {
      this.otherInfoForm.controls['relationShipWith'].disable();
    }
    else if (ownerId == 3) {
      this.otherInfoForm.controls['relationShipWith'].disable();
    } else {
      this.otherInfoForm.controls['relationShipWith'].disable();
    }

    this.otherInfoForm.controls['relationShipWith'].setValue('');
    this.otherInfoForm.controls['possessedBy'].setValue('');
    this.otherInfoForm.controls['netWeight'].setValue('');
    this.otherInfoForm.controls['date'].setValue('');
  }

  // Function for changes in Possessedby || cuckoo
  onChangePossessedBy() {
    let possessedId = this.otherInfoForm.get('possessedBy')?.value;
    if (possessedId == 1) {
      this.otherInfoForm.controls['date'].enable();
    }
    else if (possessedId == 2) {
      this.otherInfoForm.controls['date'].setValue('');

      this.otherInfoForm.controls['date'].disable();
    }
    else if (possessedId == '')

      this.otherInfoForm.controls['date'].disable();
    this.otherInfoForm.controls['date'].setValue('');
  }

  // Function for biometric verification  || cuckoo
  onBiometric(value: string) {
    if (value == 'start') {
      this.biometricLoader = true;
      setTimeout(() => {
        this.biometricLoader = false;
        this.biometric = true;
      }, 2000);

    }
    else if (value == 'edit') {
      this.biometric = false;
      this.biometricLoader = false;
    }
  }

  // Function for customer verification  || cuckoo
  onEsign(value: string) {
    if (value == 'start') {
      this.eSignLoader = true;
      setTimeout(() => {
        this.eSignLoader = false;
        this.eSign = true;
      }, 2000)

    }
    else if (value == 'edit') {
      this.eSign = false;
      this.eSignLoader = false;
    }
  }
  validateDate(item: any) {
    if (item?.date != undefined || item?.date != null) {
      const validDate = ((item?.date)?.toString()).split(' ');
      let newDate = validDate[3];
      const currentYear = new Date().getFullYear();
      if (newDate > currentYear) {
        this.otherInfoForm.patchValue({
          date: null
        })
      }
    }

  }
  get form() {
    return this.otherInfoForm.controls;
  }
  onWeightChange() {
    const netWeight = Number(this.form['netWeight'].value);
    if (netWeight == 0){
      Swal.fire({
        text: 'Net Weight should not be Zero !',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: "#4747a1",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      }).then((_result: any) => {
        this.form['netWeight'].setValue('');
        return;
      });
    }
  }
}
