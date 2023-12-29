import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchCustomerListComponent } from './search-customer-list.component';

describe('SearchCustomerListComponent', () => {
  let component: SearchCustomerListComponent;
  let fixture: ComponentFixture<SearchCustomerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchCustomerListComponent]
    });
    fixture = TestBed.createComponent(SearchCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
