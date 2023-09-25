import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditproductsComponent } from './editproducts.component';

describe('EditproductsComponent', () => {
  let component: EditproductsComponent;
  let fixture: ComponentFixture<EditproductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditproductsComponent]
    });
    fixture = TestBed.createComponent(EditproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
