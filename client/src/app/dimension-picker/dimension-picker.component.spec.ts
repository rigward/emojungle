import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionPickerComponent } from './dimension-picker.component';

describe('DimensionPickerComponent', () => {
  let component: DimensionPickerComponent;
  let fixture: ComponentFixture<DimensionPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DimensionPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimensionPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
