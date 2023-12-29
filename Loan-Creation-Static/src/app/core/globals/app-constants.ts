import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AppConstants {

    //all regular expressions here 
    public readonly IFSC_REG_EXPRESSION: string = "^[A-Za-z]{4}0[A-Za-z0-9]{6}$";
    public readonly VALID_BANK_ACC_NU = '^(?!0+$)[0-9]{9,18}$';
    public readonly VALID_PAN = "^[A-Z]{3}[P]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}$";
    public readonly VALID_MOBILE_NUMBER = "^[6-9]{1}[0-9]{9}$";

}