import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../layout/header/header.component';
import { Iuser } from '../../interfaces/iuser';
import { LoginServiceService } from '../../services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, HeaderComponent],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
      password: new FormControl(null, [])
    });
  }

  async getUser() {
    const loginUser: Iuser = this.modelForm.value as Iuser;
    loginUser.expiresInMins = 30;
    
    try {
      let response = await this.loginService.login(loginUser);
      console.log(response);
      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.modelForm.reset();
        this.router.navigate(['/usuario/home']);
      }
    } catch (error) {
      alert('Username o password incorrectos');
      this.modelForm.reset();
    }
  }
}
