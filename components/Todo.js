class Todo {
  constructor(data, templateSelector, handleCheck, handleDelete) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
    this._templateElement = document.querySelector(templateSelector);
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _renderDueDate() {
    this._dueDate = new Date(this._data.date);
    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    // Generate and configure checkbox + label
    this._generateCheckboxEl();

    // Set content
    todoNameEl.textContent = this._data.name;
    this._renderDueDate();

    // Event listeners
    this._todoCheckboxEl.addEventListener("change", () => {
      this._handleCheck({ target: this._todoCheckboxEl });
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._todoElement, this._todoCheckboxEl.checked);
    });

    return this._todoElement;
  }
}

export default Todo;
