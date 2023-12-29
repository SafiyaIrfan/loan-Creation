import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateWeightComponent } from './calculate-weight.component';

describe('CalculateWeightComponent', () => {
  let component: CalculateWeightComponent;
  let fixture: ComponentFixture<CalculateWeightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculateWeightComponent]
    });
    fixture = TestBed.createComponent(CalculateWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
