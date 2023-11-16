import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TodoapiService } from '../todoapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor( private router: Router, private authService: AuthService, private todoapi: TodoapiService ) {}

  // Verificar o login
  login() {
    this.todoapi.apiLogin(this.email, this.password).then((response: any) => {
        this.authService.setTokenUser();
        this.router.navigate(['to-do-list']);
        localStorage.setItem('token', response.data.access);
        console.log(response.data);
      })
      .catch((error: any) => {
        this.loginError = true;
        console.log(error);
      });
  }

  // Botão que redireciona para a tela de cadastro
  redirectSignup() {
    this.router.navigate(['signup']);
  }
}
