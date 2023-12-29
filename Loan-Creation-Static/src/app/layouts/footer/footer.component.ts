import { Component, OnInit } from '@angular/core';
import { TermsConditionComponent } from '../terms-condition/terms-condition.component';
import { MatDialog } from '@angular/material/dialog';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { AppGlobals } from 'src/app/src/app/core/globals/app-globals';
import { Overlay } from 'ngx-toastr';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
})
export class FooterComponent implements OnInit {

  // set the currenr year
  year: number = new Date().getFullYear();

  constructor( public dialog: MatDialog, public _globals:AppGlobals) { }

  ngOnInit(): void {
  }

  openTermsModal(value:string)
  {
    if(value=='terms')
    {
      const dialogRef = this.dialog.open(TermsConditionComponent,
        {
          autoFocus:false,
        });
    } 
    else if(value=='privacy')
    {
      const dialogRef = this.dialog.open(PrivacyPolicyComponent,
        {
          autoFocus:false,
         });
    }
  }

}
