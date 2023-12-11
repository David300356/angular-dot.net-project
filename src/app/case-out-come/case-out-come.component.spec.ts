import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseOutComeComponent } from './case-out-come.component';

describe('CaseOutComeComponent', () => {
  let component: CaseOutComeComponent;
  let fixture: ComponentFixture<CaseOutComeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseOutComeComponent]
    });
    fixture = TestBed.createComponent(CaseOutComeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
