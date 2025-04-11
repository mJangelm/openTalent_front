import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasUsuarioCardComponent } from './empresas-usuario-card.component';

describe('EmpresasUsuarioCardComponent', () => {
  let component: EmpresasUsuarioCardComponent;
  let fixture: ComponentFixture<EmpresasUsuarioCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresasUsuarioCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresasUsuarioCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
