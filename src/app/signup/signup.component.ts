import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TodoapiService } from '../todoapi.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor( private router: Router, private authService: AuthService, private todoapi: TodoapiService ) {}

  // Efetuar o cadastro
  signup() {
    this.todoapi.apiSign(this.email, this.password).then((response: any) => {
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
  // Botão que redireciona para a pagina de login
  redirectToLogin() {
    this.router.navigate(['login']);
  }
}
