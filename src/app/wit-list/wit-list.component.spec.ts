import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WitListComponent } from './wit-list.component';

describe('WitListComponent', () => {
  let component: WitListComponent;
  let fixture: ComponentFixture<WitListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WitListComponent]
    });
    fixture = TestBed.createComponent(WitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
