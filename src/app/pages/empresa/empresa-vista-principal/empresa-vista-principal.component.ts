import { Component } from '@angular/core';
import { Iuser } from '../../../interfaces/iuser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empresa-vista-principal',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './empresa-vista-principal.component.html',
  styleUrl: './empresa-vista-principal.component.css',
})
export class EmpresaVistaPrincipalComponent {
  userEmpresa!: Iuser;

  ngOnInit() {
    let userMenu = localStorage.getItem('user');
    this.userEmpresa = userMenu ? JSON.parse(userMenu) : null;
  }
}
