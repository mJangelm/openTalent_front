import { Component, Input, input } from '@angular/core';
import { Empresa } from '../../../interfaces/empresa';
import { RouterLink } from '@angular/router';
import { ImageLoaderComponent } from '../../image-loader/image-loader.component';

@Component({
  selector: 'app-empresas-usuario-card',
  imports: [RouterLink, ImageLoaderComponent],
  standalone: true,
  templateUrl: './empresas-usuario-card.component.html',
  styleUrl: './empresas-usuario-card.component.css',
})
export class EmpresasUsuarioCardComponent {
  @Input() empresaUnica!: Empresa;
}
