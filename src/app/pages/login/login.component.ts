import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../layout/header/header.component';
import { Iuser } from '../../interfaces/iuser';
import { LoginServiceService } from '../../services/login-service.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  modelForm: FormGroup;
  titulo: string;

  loginService = inject(LoginServiceService);
  router = inject(Router);

  constructor() {
    this.titulo = 'Web del reto';
    this.modelForm = new FormGroup({
      username: new FormControl(null, []),
      password: new FormControl(null, []),
    });
  }
  ngOnInit() {
    localStorage.clear();
  }
  async getUser() {
    const loginUser: Iuser = this.modelForm.value as Iuser;
    loginUser.expiresInMins = 30;

    try {
      let response = await this.loginService.login(loginUser);
      console.log(response);
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.user));

        const rol = response.user.rol;
        localStorage.setItem('rol', rol);
        this.modelForm.reset();
        switch (rol) {
          case 'USUARIO':
            this.router.navigate(['/usuario/home']);
            break;
          case 'ADMIN':
            this.router.navigate(['/usuario/home']);
            break;
          case 'EMPRESA':
            this.router.navigate(['/empresa/home']);
            break;
          default:
            this.router.navigate(['/home']);
        }
      }
    } catch (error) {
      alert('Username o password incorrectos');
      this.modelForm.reset();
    }
  }
}
