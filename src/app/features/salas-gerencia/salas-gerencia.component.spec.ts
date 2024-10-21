import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasGerenciaComponent } from './salas-gerencia.component';

describe('SalasGerenciaComponent', () => {
  let component: SalasGerenciaComponent;
  let fixture: ComponentFixture<SalasGerenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalasGerenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalasGerenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
