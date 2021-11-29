import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleCalcComponent } from './simple-calc.component';

describe('SimpleCalcComponent', () => {
  let component: SimpleCalcComponent;
  let fixture: ComponentFixture<SimpleCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleCalcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
