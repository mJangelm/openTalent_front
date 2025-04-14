import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasUsuarioCardComponent } from './ofertas-usuario-card.component';

describe('OfertasUsuarioCardComponent', () => {
  let component: OfertasUsuarioCardComponent;
  let fixture: ComponentFixture<OfertasUsuarioCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfertasUsuarioCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfertasUsuarioCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
