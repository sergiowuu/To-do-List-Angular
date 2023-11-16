import { Injectable } from '@angular/core';

import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class TodoapiService {
  constructor() {}

  // POST de cadastro
  apiSign(email: string, password: string) {
    return axios.post('http://localhost:8000/api/auth/signup', {
      email: email,
      password: password,
    });
  }

  // POST de login
  apiLogin(email: string, password: string) {
    return axios.post('http://localhost:8000/api/auth/login', {
      email: email,
      password: password,
    });
  }

  // GET para mostrar todas tarefas
  show() {
    const token = localStorage.getItem('token');
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return axios.get('http://localhost:8000/api/todo', config);
    } else {
      return Promise.reject('Token não encontrado. Você precisa fazer login.');
    }
  }

  // POST para criar tarefas
  create(task: string) {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.post(
      'http://localhost:8000/api/todo',{
        name: task,
      },config);
  }

  // DELETE de tarefas com base no ID
  delete(id?: number) {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.delete(`http://localhost:8000/api/todo/${id}`, config);
  }

  // UPDATE de tarefas com base no ID
  update(name?: string, id?: number) {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.put(`http://localhost:8000/api/todo/${id}`, { name }, config);
  }
}
