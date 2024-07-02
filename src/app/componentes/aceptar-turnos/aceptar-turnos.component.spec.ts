import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarTurnosComponent } from './aceptar-turnos.component';

describe('AceptarTurnosComponent', () => {
  let component: AceptarTurnosComponent;
  let fixture: ComponentFixture<AceptarTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AceptarTurnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AceptarTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
