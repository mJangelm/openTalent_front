import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-usuario',
  standalone:true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-usuario.component.html',
  styleUrl: './menu-usuario.component.css'
})
export class MenuUsuarioComponent {


@Input() isMenuOpen: boolean = false;
@Output() eventoMenu = new EventEmitter<void>();

onClose() {
  this.eventoMenu.emit();
}
}


