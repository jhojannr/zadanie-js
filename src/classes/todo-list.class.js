import { Todo } from "./index";

const cantPendiente = document.querySelector('#cantPendientes');

export class TodoList {
  constructor() {
    this.cargarLocalStorage();
    this.calcularPendientes();
  }

  nuevoTodo(todo) {
    this.todos.push(todo);
    this.guardarLocalStorage();
    this.calcularPendientes();
  }

  eliminarTodo(id) {
    this.todos.filter((todo) => todo.id != id);
    this.guardarLocalStorage();
    this.calcularPendientes();
  }

  marcarCompletado(id) {
    for (const todo of this.todos) {
      if (todo.id == id) {
        todo.completado = !todo.completado;
      }
    }
    this.guardarLocalStorage();
    this.calcularPendientes();
  }

  eliminarCompletados() {
    this.todos.filter((todo) => !todo.completado);
    this.guardarLocalStorage();
  }

  guardarLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(this.todos));
  }

  cargarLocalStorage() {
    this.todos = localStorage.getItem("todo")
      ? JSON.parse(localStorage.getItem("todo"))
      : [];

    this.todos = this.todos.map((obj) => Todo.fromJson(obj));
  }

  calcularPendientes() {
    let pendientes = 0;
    this.todos.forEach((todo) => {
      if (!todo.completado) {
        pendientes++;
      }
    });    
    return cantPendiente.innerText = pendientes;
  }
}
