import * as fromStore from "./store";
import { renderTodos } from "./utils";

const input = document.querySelector("input") as HTMLInputElement;
const button = document.querySelector("button") as HTMLButtonElement;
const destroy = document.querySelector(".unsubscribe") as HTMLButtonElement;
const todoList = document.querySelector(".todos") as HTMLLIElement;

const reducers = {
  todos: fromStore.reducer
};

const store = new fromStore.Store(reducers);

console.log(store.value);

button.addEventListener(
  "click",
  () => {
    if (!input.value.trim()) return;
    const todo = { label: input.value, complete: false };

    store.dispatch(new fromStore.AddTodo(todo));
    console.log(todo);
    input.value = "";
  },
  false
);

const unsubscribe = store.subscribe(state => {
  console.log("render TODOS");
  renderTodos(state.todos.data);
});

destroy.addEventListener("click", unsubscribe, false);

todoList.addEventListener("click", function(event) {
  const target = event.target as HTMLButtonElement;
  if (target.nodeName.toLowerCase() === "button") {
    console.log(target);
    const todo = JSON.parse(target.getAttribute("data-todo") as any);
    store.dispatch(new fromStore.RemoveTodo(todo));
  }
});

const unsub = store.subscribe(state => console.log("STATE:::", state));
unsub();
