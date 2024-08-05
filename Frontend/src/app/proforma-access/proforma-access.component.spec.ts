import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformaAccessComponent } from './proforma-access.component';

describe('ProformaAccessComponent', () => {
  let component: ProformaAccessComponent;
  let fixture: ComponentFixture<ProformaAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProformaAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProformaAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
