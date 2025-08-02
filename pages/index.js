import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

// DOM elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
const todosList = document.querySelector(".todos__list");

// Instantiate TodoCounter to track completed and total todos
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// Handler for checkbox toggle (complete/incomplete)
const handleCheck = (evt) => {
  const isChecked = evt.target.checked;
  todoCounter.updateCompleted(isChecked);
  // You could also update the todo's data object here if you track it globally
};

// Handler for deleting a todo
const handleDelete = (todoElement, isCompleted) => {
  todoCounter.updateTotal(false); // One less todo total
  if (isCompleted) {
    todoCounter.updateCompleted(false); // If it was completed, update completed count
  }
  todoElement.remove(); // Remove from DOM
};

// Generate a todo DOM element and attach event listeners
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();

  const checkbox = todoElement.querySelector(".todo__completed");
  checkbox.addEventListener("change", handleCheck);

  const deleteBtn = todoElement.querySelector(".todo__delete-btn");
  deleteBtn.addEventListener("click", () =>
    handleDelete(todoElement, checkbox.checked)
  );

  return todoElement;
};

// Render a todo item into the Section and update counter totals
const renderTodo = (item) => {
  const todoElement = generateTodo(item);
  section.addItem(todoElement);
};

// Section instance managing the list of todos
const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

// Render initial todos on page load
section.renderItems();

// Popup with form for adding new todos
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formData) => {
    // Parse date and adjust for timezone
    const date = new Date(formData.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();

    renderTodo({
      name: formData.name,
      date,
      id,
    });

    newTodoValidator.resetValidation();
    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

// Open popup when "Add Todo" button clicked
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// Setup form validation
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
