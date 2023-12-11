import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SusDetailComponent } from './sus-detail.component';

describe('SusDetailComponent', () => {
  let component: SusDetailComponent;
  let fixture: ComponentFixture<SusDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SusDetailComponent]
    });
    fixture = TestBed.createComponent(SusDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
