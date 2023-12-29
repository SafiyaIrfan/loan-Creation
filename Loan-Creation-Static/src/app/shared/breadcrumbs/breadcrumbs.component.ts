import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
    standalone: true,
    imports:[CommonModule]
})

/**
 * Bread Crumbs Component
 */
export class BreadcrumbsComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() breadcrumbItems!: Array<{
    active?: boolean;
    label?: string;
  }>;

  constructor() { }

  ngOnInit(): void {
  }

}
