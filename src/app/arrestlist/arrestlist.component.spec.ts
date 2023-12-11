import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrestlistComponent } from './arrestlist.component';

describe('ArrestlistComponent', () => {
  let component: ArrestlistComponent;
  let fixture: ComponentFixture<ArrestlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArrestlistComponent]
    });
    fixture = TestBed.createComponent(ArrestlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
