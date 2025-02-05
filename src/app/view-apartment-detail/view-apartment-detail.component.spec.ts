import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApartmentDetailComponent } from './view-apartment-detail.component';

describe('ViewApartmentDetailComponent', () => {
  let component: ViewApartmentDetailComponent;
  let fixture: ComponentFixture<ViewApartmentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewApartmentDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewApartmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
