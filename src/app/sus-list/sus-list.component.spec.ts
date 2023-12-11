import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SusListComponent } from './sus-list.component';

describe('SusListComponent', () => {
  let component: SusListComponent;
  let fixture: ComponentFixture<SusListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SusListComponent]
    });
    fixture = TestBed.createComponent(SusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
