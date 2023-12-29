import { Component, OnInit } from '@angular/core';
import { EventService } from '../core/services/event.service';
import {LAYOUT_VERTICAL, LAYOUT_HORIZONTAL, LAYOUT_TWOCOLUMN} from './layout.model';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { VerticalComponent } from './vertical/vertical.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    standalone: true,
    imports: [NgIf, VerticalComponent, HorizontalComponent]
})
/**
 * Layout Component
 */
export class LayoutComponent implements OnInit {

  layoutType!: string;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.layoutType =  LAYOUT_VERTICAL;
    document.body.setAttribute('layout',this.layoutType)

     // listen to event and change the layout, theme, etc
     this.eventService.subscribe('changeLayout', (layout) => {
      this.layoutType = layout;
    });
    
  }

  /**
  * Check if the vertical layout is requested
  */
   isVerticalLayoutRequested() {
    return this.layoutType === LAYOUT_VERTICAL;
  }

  /**
   * Check if the horizontal layout is requested
   */
   isHorizontalLayoutRequested() {
    return this.layoutType === LAYOUT_HORIZONTAL;
  }

  /**
   * Check if the horizontal layout is requested
   */
   isTwoColumnLayoutRequested() {
    return this.layoutType === LAYOUT_TWOCOLUMN;
  }
}
