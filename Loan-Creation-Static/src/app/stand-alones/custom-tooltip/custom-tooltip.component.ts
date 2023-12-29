import { AfterViewInit, Component, ElementRef, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-tooltip.component.html',
  styleUrls: ['./custom-tooltip.component.scss']
})
export class CustomTooltipComponent implements AfterViewInit {
  @Input() showsTooltip = true;
  @Input() tooltipText = 'Default tooltip text';
  @Input() tooltiptext = 'Default tooltip text';
  @Input() image: any
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  @ViewChild('tooltip', { static: false }) tooltipEl!: ElementRef;
  public maxTooltipWidth: any;
  public triggerElementRect: any;
  constructor(public elRef: ElementRef, public renderer: Renderer2) { }

  ngAfterViewInit() {
    this.adjustPosition();

  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustPosition();
  }

  adjustPosition() {
    this.triggerElementRect = this.elRef.nativeElement.getBoundingClientRect();
    const tooltipElement = this?.tooltipEl?.nativeElement;
    const tooltipElementRect = tooltipElement?.getBoundingClientRect();
    const margin = 10;

    this.maxTooltipWidth = 0;
    if (tooltipElement) {
      if (this.position === 'top' || this.position === 'bottom') {
        this.maxTooltipWidth = window.innerWidth - 4 * margin;
        this.renderer.setStyle(tooltipElement, 'maxWidth', `${this.maxTooltipWidth / 2}px`);

        let newLeft = this.triggerElementRect.left + this.triggerElementRect.width / 2 - tooltipElement.offsetWidth / 2;
        let newRight = this.triggerElementRect.left + this.triggerElementRect.width / 2 + tooltipElement.offsetWidth / 2;

        if (newLeft < 0) {
          newLeft = margin;
          this.renderer.setStyle(tooltipElement, 'left', `${newLeft}px`);
        }

      }
      else if (this.position === 'left' || this.position === 'right') {
        this.maxTooltipWidth = this.position === 'left'
          ? this.triggerElementRect.left - margin
          : window.innerWidth - this.triggerElementRect.right - margin;

        this.renderer.setStyle(tooltipElement, 'maxWidth', `${this.maxTooltipWidth}px`);
        if (this.position === 'left') {
          let newRight = window.innerWidth - this.triggerElementRect.left + margin;
          this.renderer.setStyle(tooltipElement, 'right', `${newRight}px`);
          this.renderer.setStyle(tooltipElement, 'left', null);  // Réinitialiser le style 'left'
        } else {
          let newLeft = this.triggerElementRect.right + margin;
          this.renderer.setStyle(tooltipElement, 'left', `${newLeft}px`);
          this.renderer.setStyle(tooltipElement, 'right', null);  // Réinitialiser le style 'right'
        }
      }
    }
  }
}
