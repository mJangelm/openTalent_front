import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Iuser } from '../../../interfaces/iuser';
import { Estudiante } from '../../../interfaces/estudiante';

@Component({
  selector: 'app-menu-usuario',
  standalone:true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-usuario.component.html',
  styleUrl: './menu-usuario.component.css'
})
export class MenuUsuarioComponent {

activatedRouter = inject(ActivatedRoute);
usuario!: Iuser;
estudiante! : Estudiante;
router = inject(Router);
@Input() isMenuOpen: boolean = false;
@Output() eventoMenu = new EventEmitter<void>();

onClose() {
  this.eventoMenu.emit();
}

logOut() : void {
localStorage.clear();
  this.router.navigate(['/login']);
  }


  ngOnInit() {
let userMenu = localStorage.getItem('user');
this.estudiante = userMenu ? JSON.parse(userMenu) : null;

console.log('aquí está la info' +userMenu)
  }
}


