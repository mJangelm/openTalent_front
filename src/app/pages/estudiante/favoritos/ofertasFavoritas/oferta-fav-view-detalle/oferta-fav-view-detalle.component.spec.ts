import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaFavViewDetalleComponent } from './oferta-fav-view-detalle.component';

describe('OfertaFavViewDetalleComponent', () => {
  let component: OfertaFavViewDetalleComponent;
  let fixture: ComponentFixture<OfertaFavViewDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfertaFavViewDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfertaFavViewDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
