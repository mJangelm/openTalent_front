import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-empresa-user',
  imports: [RouterLink],
  standalone:true,
  templateUrl: './navbar-empresa-user.component.html',
  styleUrl: './navbar-empresa-user.component.css'
})
export class NavbarEmpresaUserComponent {
  @Output() toggleMenuEvent = new EventEmitter<void>();

  sessionUser = {
    nombre: '',
    foto: '',
  };

  activeRoute: string = '';

  constructor(private router: Router) {
    // NUEVO: Escuchamos cambios de ruta
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url; // Se actualiza inmediatamente
      }
    });
  }
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
    this.activeRoute = this.router.url;
  }

  onMenuButtonClick(): void {
    this.toggleMenuEvent.emit();
  }

  isActive(route: string): boolean {
    return this.activeRoute.startsWith(route);
  }

}
