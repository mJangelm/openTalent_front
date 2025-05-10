import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-botonera',
  imports: [RouterLink],
  templateUrl: './botonera.component.html',
  styleUrl: './botonera.component.css',
})
export class BotoneraComponent {
  @Input() _id!: number;
  @Input() nombre!: string;
  borrarProducto(arg0: any) {
    throw new Error('Method not implemented.');
  }
}
