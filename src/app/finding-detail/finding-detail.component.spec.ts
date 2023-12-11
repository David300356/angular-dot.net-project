import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingDetailComponent } from './finding-detail.component';

describe('FindingDetailComponent', () => {
  let component: FindingDetailComponent;
  let fixture: ComponentFixture<FindingDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindingDetailComponent]
    });
    fixture = TestBed.createComponent(FindingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
