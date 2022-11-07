import { isNgTemplate } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoItem } from './model/ToDoItem';
import { CreateTodoitemComponent } from './todo/create-todoitem/create-todoitem.component';
import { ListTodoitemComponent } from './todo/list-todoitem/list-todoitem.component';
import { TodoitemDetailComponent } from './todo/todoitem-detail/todoitem-detail.component';
import { UpdateTodoItemComponent } from './todo/update-todo-item/update-todo-item.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full'
  },
  {
    path: 'todos/create',
    component: CreateTodoitemComponent,
  },
  {
    path: 'todos/edit/:id',
    component: UpdateTodoItemComponent,
  },
  {
    path: 'todos',
    component: ListTodoitemComponent,
  },
  {
    path: 'todos/:id',
    component: TodoitemDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
