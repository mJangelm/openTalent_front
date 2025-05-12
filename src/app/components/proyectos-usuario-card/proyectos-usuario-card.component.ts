import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Proyecto } from '../../interfaces/proyecto';
import { Router } from '@angular/router';
import { IFavoritosCambiar } from '../../interfaces/ifavoritos-cambiar';
import { ProyectosService } from '../../services/proyectos.service';
import { BotonEditProyectoComponent } from '../boton-edit-proyecto/boton-edit-proyecto.component';
import { CommonModule } from '@angular/common';
import { ImageLoaderComponent } from '../image-loader/image-loader.component';
import Swal from 'sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-proyectos-usuario-card',
  imports: [BotonEditProyectoComponent, CommonModule, ImageLoaderComponent],
  templateUrl: './proyectos-usuario-card.component.html',
  styleUrl: './proyectos-usuario-card.component.css',
})
export class ProyectosUsuarioCardComponent {
  @Input() proyectoUnico!: Proyecto;
  @Input() esEditable = false;
  @Output() projectDeleted = new EventEmitter<number>();
  @Output() quitarFavoritoProyecto = new EventEmitter<Proyecto>();

  private proyectoService = inject(ProyectosService);
  private router = inject(Router);

  favorita: IFavoritosCambiar = {} as IFavoritosCambiar;
  deleted = false;

  toggleFavorita() {
    const nuevaEsFavorito = !this.proyectoUnico.esFavorito;
    this.favorita = {
      id: this.proyectoUnico.idProyecto,
      estado: nuevaEsFavorito,
    };
    this.proyectoService.cambiarEstadoFavorito(this.favorita).subscribe(() => {
      this.proyectoUnico.esFavorito = nuevaEsFavorito;
      if (!nuevaEsFavorito) {
        this.quitarFavoritoProyecto.emit(this.proyectoUnico);
      }
    });
  }

  onDeleteClicked(id: number) {
    Swal.fire({
      title: '¿Quieres borrar este proyecto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.proyectoService.cancelarProyecto(id).subscribe({
          next: () => {
            Swal.fire('Borrado', 'Tu proyecto ha sido eliminado.', 'success');
            this.deleted = true;
            this.projectDeleted.emit(id);
          },
          error: (err) => {
            console.error('Error borrando proyecto', err);
            Swal.fire('Error', 'No se ha podido borrar.', 'error');
          },
        });
      }
    });
  }

  verProyecto() {
    if (!this.esEditable) {
      this.router.navigate([
        `/usuario/proyectos/${this.proyectoUnico.idProyecto}`,
      ]);
    }
  }
}
