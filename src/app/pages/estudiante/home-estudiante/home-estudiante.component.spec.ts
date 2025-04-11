import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEstudianteComponent } from './home-estudiante.component';

describe('HomeEstudianteComponent', () => {
  let component: HomeEstudianteComponent;
  let fixture: ComponentFixture<HomeEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeEstudianteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
