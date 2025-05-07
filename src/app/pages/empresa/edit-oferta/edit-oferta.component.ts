import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { Oferta } from '../../../interfaces/oferta';
import { IanadirOferta } from '../../../interfaces/ianadir-oferta';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertaService } from '../../../services/oferta.service';

@Component({
  selector: 'app-edit-oferta',
  imports: [ReactiveFormsModule],
  standalone:true,
  templateUrl: './edit-oferta.component.html',
  styleUrl: './edit-oferta.component.css'
})
export class EditOfertaComponent {
onSubmit() {
throw new Error('Method not implemented.');
}
volver() {
throw new Error('Method not implemented.');
}
  private activatedRouter = inject(ActivatedRoute);
  private router = inject(Router);
  private servicioOfertas = inject(OfertaService);

  modelForm!: FormGroup;
  private idOferta!: number;


}