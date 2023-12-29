import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AppMessages {

    public readonly ID_PROOF_REQUIRED: string = "ID Proof must be collected from the customer.";
    public readonly CUSTOMER_LOAN_OVERDUE: string = "This customer has 5 overdue loan(s). Do you want to continue?";
    public readonly INVALID_LOGIN: string = "Invalid login lredentials. Please try again!";

}