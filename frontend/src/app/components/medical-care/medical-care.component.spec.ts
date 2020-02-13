import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalCareComponent } from './medical-care.component';

describe('MedicalCareComponent', () => {
  let component: MedicalCareComponent;
  let fixture: ComponentFixture<MedicalCareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalCareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
