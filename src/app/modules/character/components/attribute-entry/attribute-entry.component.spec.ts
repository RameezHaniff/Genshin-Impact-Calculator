import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeEntryComponent } from './attribute-entry.component';

describe('AtrributeEntryComponent', () => {
  let component: AttributeEntryComponent;
  let fixture: ComponentFixture<AttributeEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributeEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
