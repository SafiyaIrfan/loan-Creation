import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeCustomizerComponent } from './theme-customizer.component';

describe('ThemeCustomizerComponent', () => {
  let component: ThemeCustomizerComponent;
  let fixture: ComponentFixture<ThemeCustomizerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeCustomizerComponent]
    });
    fixture = TestBed.createComponent(ThemeCustomizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
