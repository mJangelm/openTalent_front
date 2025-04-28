import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { Iuser } from '../../../interfaces/iuser';
import { Estudiante } from '../../../interfaces/estudiante';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-usuario',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-usuario.component.html',
  styleUrl: './menu-usuario.component.css',
})
export class MenuUsuarioComponent {
  activatedRouter = inject(ActivatedRoute);
  router = inject(Router);

  estudiante!: Estudiante;

  @Input() isMenuOpen: boolean = false;
  @Output() eventoMenu = new EventEmitter<void>();

  ngOnInit() {
    let userMenu = localStorage.getItem('user');
    this.estudiante = userMenu ? JSON.parse(userMenu) : null;
  }

  onClose() {
    this.eventoMenu.emit();
  }

  logOut(): void {
    localStorage.clear();
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Te has desconectado correctamente.',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      toast: false,
      position: 'center',
    });
    this.eventoMenu.emit();
    this.router.navigate(['/login']);
  }
}
