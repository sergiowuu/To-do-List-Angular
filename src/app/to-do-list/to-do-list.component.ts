import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TodoapiService } from '../todoapi.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent {
  newTask: string = '';
  tasks: { id?: number; name: string; editing: boolean; done: boolean }[] = [];

  constructor( private router: Router, private authService: AuthService, private todoapi: TodoapiService ) {
    this.showTasks();
  }

  // Exibi todas as tarefas
  showTasks() {
    this.todoapi.show().then((response) => {
        this.tasks = response.data;
        console.log(this.tasks);
      })
      .catch((error) => {
        console.error('Erro ao buscar as tarefas:', error);
      });
  }

  // Adiciona uma nova tarefa
  addTask() {
    if (this.newTask) {
      this.todoapi.create(this.newTask).then(() => {
          this.showTasks();
          this.newTask = '';
        })
        .catch((error) => {
          console.error('Erro ao adicionar a tarefa:', error);
        });
    }
  }

  // Exclui uma tarefa com base no índice
  deleteTask(id?: number) {
    console.log(id);
    this.todoapi.delete(id).then(() => {
        this.showTasks();
      })
      .catch((error) => {
        console.error('Erro ao excluir a tarefa:', error);
      });
  }

  // Alterna o modo de edição de uma tarefa
  editTask(id?: any) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) task.editing = !task?.editing || false;
  }

  // Salva uma tarefa após a edição
  saveTask(name?: string, id?: any) {
    this.todoapi.update(name, id).then(() => {
        this.showTasks();
        const task = this.tasks.find((task) => task.id === id);
        if (task) task.editing = !task?.editing || false;
      })
      .catch((error) => {
        console.error('Erro ao editar a tarefa:', error);
      });
  }

  // Desloga da To do list
  logout() {
    this.authService.logout();
    this.router.navigate(['signup']);
  }
}
