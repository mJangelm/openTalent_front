import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroEmpresaService } from '../../../services/registro-empresa.service';
import { EmpresaRegistroDto } from '../../../interfaces/empresa-registro-dto';

@Component({
  selector: 'app-registro-empresa',
  imports: [ReactiveFormsModule],
  standalone:true,
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent {


modelForm!: FormGroup;
router = inject(Router);
servicioEmpresaRegistro = inject(RegistroEmpresaService);
constructor() {
  this.modelForm = new FormGroup({
    nombre: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    apellido: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    fechaNacimiento: new FormControl(null, [Validators.required]),
    telefono: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{9}')]),
    username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    pais: new FormControl(null, [Validators.required]),
    provincia: new FormControl(null, [Validators.required]),
    poblacion: new FormControl(null, [Validators.required]),
    calle: new FormControl(null, [Validators.required]),
    codigoPostal: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{5}')]),
    fotoPerfil: new FormControl(null),
    cif: new FormControl(null, [Validators.required])
  })
}
async registro() {
    const registroEmpresa :EmpresaRegistroDto = this.modelForm.value as EmpresaRegistroDto;

    try {
     await this.servicioEmpresaRegistro.registro(registroEmpresa);
      console.log('Empresa registrada');
      this.router.navigate(['/login']);

    
  } catch (error) {
    alert('No se ha podido registrar');
  }
 }

}
