import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaEvaluationComponent } from './agenda-evaluation.component';

describe('AgendaEvaluationComponent', () => {
  let component: AgendaEvaluationComponent;
  let fixture: ComponentFixture<AgendaEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
