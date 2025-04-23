import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { MenuUsuarioComponent } from './components/usuario/menu-usuario/menu-usuario.component';
import { NavbarUsuarioComponent } from './components/usuario/navbar-usuario/navbar-usuario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuUsuarioComponent, NavbarUsuarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'OpenTalent';
  router = inject(Router);
  isMenuOpenHome: boolean = false;
  toggleMenuHome() {
    this.isMenuOpenHome = !this.isMenuOpenHome;
  }
  showNavbar() {
    return (
      this.router.url.startsWith('/usuario') ||
      this.router.url.startsWith('/admin') ||
      this.router.url.startsWith('/empresa')
    );
  }
}
