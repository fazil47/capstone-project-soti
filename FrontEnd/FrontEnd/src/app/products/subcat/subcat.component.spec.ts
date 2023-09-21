import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcatComponent } from './subcat.component';

describe('SubcatComponent', () => {
  let component: SubcatComponent;
  let fixture: ComponentFixture<SubcatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubcatComponent]
    });
    fixture = TestBed.createComponent(SubcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
