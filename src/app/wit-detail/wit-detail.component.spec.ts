import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WitDetailComponent } from './wit-detail.component';

describe('WitDetailComponent', () => {
  let component: WitDetailComponent;
  let fixture: ComponentFixture<WitDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WitDetailComponent]
    });
    fixture = TestBed.createComponent(WitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
