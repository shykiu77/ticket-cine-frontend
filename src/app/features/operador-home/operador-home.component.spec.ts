import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadorHomeComponent } from './operador-home.component';

describe('OperadorHomeComponent', () => {
  let component: OperadorHomeComponent;
  let fixture: ComponentFixture<OperadorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperadorHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperadorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
