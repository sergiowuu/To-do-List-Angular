import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;

  // Verifique se o usuário está autenticado com base no token
  isAuthenticatedUser(): boolean {
    const token = localStorage.getItem('token');
    const isAuthenticated = this.isAuthenticated || token !== null;
    console.log(token);
    console.log(`Usuário autenticado: ${isAuthenticated}`);
    return isAuthenticated;
  }
  
  // Configuração do estado de autenticação do usuario
  setTokenUser() {
    this.isAuthenticated = true;
    const token = localStorage.getItem('token');
    const isAuthenticated = this.isAuthenticated || token !== null;
    console.log(token);
  }

  // Realiza o logout
  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    axios.defaults.headers['Authorization'] = null;
    console.log('Logout realizado');
  }
}
