import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-usuario',
  imports: [RouterLink],
  standalone:true,
  templateUrl: './navbar-usuario.component.html',
  styleUrl: './navbar-usuario.component.css'
})
export class NavbarUsuarioComponent {
@Output() toggleMenuEvent = new EventEmitter<void>();

onMenuButtonClick() {
  this.toggleMenuEvent.emit();
}
}
