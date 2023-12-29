import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollapsileDataService {
  goldDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  formData: any = {}; // Property to store the form data
  goldFormData:any={};

  constructor() { }
  setFormData(data: any) {
    this.formData = data;
  }

  setGoldFormData(data: any) {
      this.goldFormData = data;
     }

  // Method to get the form data
  getFormData() {
    return this.formData;
  }
}
