import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingListComponent } from './finding-list.component';

describe('FindingListComponent', () => {
  let component: FindingListComponent;
  let fixture: ComponentFixture<FindingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindingListComponent]
    });
    fixture = TestBed.createComponent(FindingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
