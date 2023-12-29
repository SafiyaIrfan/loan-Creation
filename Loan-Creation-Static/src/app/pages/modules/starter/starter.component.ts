import { Component, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from 'src/app/shared/breadcrumbs/breadcrumbs.component';
@Component({
    selector: 'app-starter',
    imports: [BreadcrumbsComponent],
    templateUrl: './starter.component.html',
    styleUrls: ['./starter.component.scss'],
    standalone: true
})

/**
 * Starter Component
 */
export class StarterComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Pages' },
      { label: 'Starter', active: true }
    ];
  }

}
