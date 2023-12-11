import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCaseComponent } from './assign-case.component';

describe('AssignCaseComponent', () => {
  let component: AssignCaseComponent;
  let fixture: ComponentFixture<AssignCaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignCaseComponent]
    });
    fixture = TestBed.createComponent(AssignCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
