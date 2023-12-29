import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    private localStorageKey = 'loanData';
    private customerSelected = 'customer'
    customer: any

    constructor() { }

    saveDataToLocalStorage(data: any): void {
        // const existingData = this.getDataFromLocalStorage();
        const newData = data;
        localStorage.setItem(this.localStorageKey, JSON.stringify(newData));
    }

    getDataFromLocalStorage(): any[] {
        const data = localStorage.getItem(this.localStorageKey);
        return data ? JSON.parse(data) : [];
    }

    clearLocalStorage(){
        localStorage.clear()
    }

    saveCustomer(data: any): any {
        console.log(data)
        const newData = data;
        localStorage.setItem(this.customerSelected, JSON.stringify(newData))
    }
    setCustomer(customer:any){
        console.log(customer)
        this.customer = customer;
    }
    getCustomerData(){
        return this.customer;
    }
    getCustomer(): any {
        const data = localStorage.getItem(this.customerSelected);
        return data ? JSON.parse(data) : null;
    }

}
