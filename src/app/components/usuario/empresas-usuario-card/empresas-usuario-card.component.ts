import { Component, Input, input } from '@angular/core';
import { Empresa } from '../../../interfaces/empresa';

@Component({
  selector: 'app-empresas-usuario-card',
  imports: [],
  standalone:true,
  templateUrl: './empresas-usuario-card.component.html',
  styleUrl: './empresas-usuario-card.component.css'
})
export class EmpresasUsuarioCardComponent {

  @Input() empresaUnica!: Empresa;

}
