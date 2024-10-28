import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificarMedicoComponent } from './calificar-medico.component';

describe('CalificarMedicoComponent', () => {
  let component: CalificarMedicoComponent;
  let fixture: ComponentFixture<CalificarMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalificarMedicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalificarMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
