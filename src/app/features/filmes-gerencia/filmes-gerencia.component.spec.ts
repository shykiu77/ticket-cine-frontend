import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmesGerenciaComponent } from './filmes-gerencia.component';

describe('FilmesGerenciaComponent', () => {
  let component: FilmesGerenciaComponent;
  let fixture: ComponentFixture<FilmesGerenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmesGerenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmesGerenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
