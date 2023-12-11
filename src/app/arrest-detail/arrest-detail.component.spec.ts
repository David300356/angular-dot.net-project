import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrestDetailComponent } from './arrest-detail.component';

describe('ArrestDetailComponent', () => {
  let component: ArrestDetailComponent;
  let fixture: ComponentFixture<ArrestDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArrestDetailComponent]
    });
    fixture = TestBed.createComponent(ArrestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
