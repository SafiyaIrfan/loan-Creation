import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDropdownComponent } from './search-dropdown.component';

describe('SearchDropdownComponent', () => {
  let component: SearchDropdownComponent;
  let fixture: ComponentFixture<SearchDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchDropdownComponent, CommonModule]
    });
    fixture = TestBed.createComponent(SearchDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties based on items', () => {
    component.items = {
      array: [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }],
      isSearchable: true,
      placeholderData: 'Select Item',
    };
    component.ngOnInit();
    expect(component.itemsArray.length).toBe(2);
    expect(component.placeholder).toBe('Select Item');
    expect(component.isSearchable).toBe(true);
  });

  it('should call onChange with the correct value on onSelectionChange', () => {
    spyOn(component, 'onChange');
    component.onSelectionChange();
    expect(component.currentValue).toBe(component.selectedValue);
    expect(component.onChange).toHaveBeenCalledWith(component.selectedValue);
  });

  it('should open dropdown on focus', () => {
    component.onFocus();
    expect(component.isDropdownOpen).toBe(true);
  });

  it('should close dropdown on blur', () => {
    component.isDropdownOpen = true;
    component.onBlur();
    expect(component.isDropdownOpen).toBe(false);
  });

  it('should close dropdown on tab key down if dropdown is open', () => {
    component.isDropdownOpen = true;
    const mockEvent = { key: 'Tab' };
    component.onTabKeyDown(mockEvent);
    expect(component.isDropdownOpen).toBe(false);
  });

  it('should not close dropdown on tab key down if dropdown is closed', () => {
    component.isDropdownOpen = false;
    const mockEvent = { key: 'Tab' };
    component.onTabKeyDown(mockEvent);
    expect(component.isDropdownOpen).toBe(false);
  });
});
