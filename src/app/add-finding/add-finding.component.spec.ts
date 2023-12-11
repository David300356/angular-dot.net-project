import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFindingComponent } from './add-finding.component';

describe('AddFindingComponent', () => {
  let component: AddFindingComponent;
  let fixture: ComponentFixture<AddFindingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFindingComponent]
    });
    fixture = TestBed.createComponent(AddFindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
