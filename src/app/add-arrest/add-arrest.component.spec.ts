import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArrestComponent } from './add-arrest.component';

describe('AddArrestComponent', () => {
  let component: AddArrestComponent;
  let fixture: ComponentFixture<AddArrestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddArrestComponent]
    });
    fixture = TestBed.createComponent(AddArrestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
