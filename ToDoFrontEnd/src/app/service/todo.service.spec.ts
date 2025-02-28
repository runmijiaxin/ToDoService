import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { TodoApiService } from '../api/todo.api.service';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';
import { TodoService } from './todo.service';

describe('TodoService', () => {

  let service: TodoService;
  let todoStoreService: TodoStoreService;
  let httpClient: any;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'delete']);
    todoStoreService = new TodoStoreService();
    TestBed.configureTestingModule({
      providers: [
        TodoApiService,
        {provide:HttpClient, useValue: httpClientSpy}
      ]
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create todoItem via mockHttp post', () => {
    // given
    const toDoItem = new ToDoItem(9, 'title', 'description', true);
    httpClientSpy.post.and.returnValue(of({}));
    // when
    service.create(toDoItem);
    // then
    expect(httpClientSpy.post).toHaveBeenCalledWith('https://localhost:5001/ToDos', toDoItem);
  });

  it('should response error when create fail', () => {
    // given
    const toDoItem = new ToDoItem(9, 'title', 'description', true);
    httpClientSpy.post.and.returnValue(throwError(() => ({
      errorMessage: 'create failed'
    })));
    // when
    service.create(toDoItem);
    // then
    expect(service.errorMessage).toEqual('create failed')
  });

  it('should delete todoItem success via mockHttp delete', () => {
    // given
    const id = 1;
    httpClientSpy.delete.and.returnValue(of({}));
    // when
    service.delete(id);
    // then
    expect(httpClientSpy.delete).toHaveBeenCalledWith('https://localhost:5001/ToDos/'+String(id));
  });

  it('should response error when delete fail', () => {
    // given
    const id = 1;
    httpClientSpy.delete.and.returnValue(throwError(() => ({
      errorMessage: 'create failed'
    })));
    // when
    service.delete(id);
    // then
    expect(service.errorMessage).toEqual('create failed')
  });
});
