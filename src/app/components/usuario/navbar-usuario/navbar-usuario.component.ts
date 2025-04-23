import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-usuario',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-usuario.component.html',
  styleUrl: './navbar-usuario.component.css',
})
export class NavbarUsuarioComponent implements OnInit {
  @Output() toggleMenuEvent = new EventEmitter<void>();

  sessionUser = {
    nombre: '',
    foto: '',
  };

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        this.sessionUser = {
          nombre: parsedUser.nombre,
          foto: parsedUser.fotoPerfil,
        };
      } catch (error) {
        console.error('Error al parsear el usuario desde localStorage', error);
      }
    } else {
      this.sessionUser = {
        nombre: 'Invitado',
        foto: 'https://via.placeholder.com/50',
      };
    }
  }

  onMenuButtonClick(): void {
    this.toggleMenuEvent.emit();
  }
}
