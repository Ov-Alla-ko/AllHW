//псевдокод

// task = {
//   id: {
//     type: String,
//     required: true
//   },
//   title: {
//     type: String,
//     required: true
//   },
//   text: {
//     type: String,
//     required: false
//   }
// };

(function() {
  let storage = {
    todo: []
  };

  const table = document.querySelector(".table tbody"); // обращение к тегу tbody который нахо-я в классе .table
  const wholeTable = document.querySelector(".table");
  const form = document.querySelector("form");
  const title = document.querySelector("input[name=title]");
  const text = document.querySelector("input[name=text]");
  const alertContainer = document.querySelector(".container");
  const btn = document.querySelector(".btn-primary");
  const formWrapper = document.querySelector(".card");

  const emptyTasksMessage = document.createElement("p");
  emptyTasksMessage.classList.add("text-danger");
  emptyTasksMessage.style.marginTop = "15px";
  emptyTasksMessage.textContent = "Your ToDo list is empty!";
  const emptyTaskMessage = document.createElement("p");
  emptyTaskMessage.classList.add("text-blue");
  emptyTaskMessage.style.marginTop = "15px";
  emptyTaskMessage.textContent = "Your have not tasks!";

  wholeTable.style.textAlign = "center";

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (title.value === "") {
      console.log("Title is empty");
      alertMessage("alert-danger", "Title is empty!");
      return;
    }

    addNewToDoToStorage(title.value, text.value);
    alertMessage("alert-info", "Task has been added!");

    form.reset();
  });

  btn.addEventListener("click", function() {
    const storageList = storage.todo;

    for (let i = 0; i < storageList; i++) {
      storageList[i].title = title.value;
      storageList[i].text = text.value;
    }
  });

  // фу-и по созданию ID
  function generateId() {
    const words =
      "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"; // набор символов для генерации значения
    let id = "";
    for (let char of words) {
      let index = Math.floor(Math.random() * words.length);
      id += words[index]; // создание id
    }

    return id;
  }

  // ф-я по созданию newTask и с добавлением её в storage.todo
  function addNewToDoToStorage(title, text) {
    if (!title) return console.log("Enter title of task");

    const newTask = {
      id: generateId(),
      title: title, //title, - равнозначно
      text: text || ""
    };

    storage.todo.push(newTask); // добавляем в свойство объекта новый объект newTask

    addNewTodoToView(newTask); // вызов функции
    return storage.todo; // возврат значения
  }

  /**
   * Add new task to view
   * @param {Object} task
   */

  function addNewTodoToView(task) {
    const template = todoTemplate(task);
    table.insertAdjacentHTML("afterbegin", template);
  }

  // addNewToDoToStorage("Do homework", "deadline 22.08 09:00");

  /**
   * Create html template
   *
   * @parem {Object} task
   */

  // <button class="task-undone-button">Make undone</button>

  function todoTemplate(task) {
    return `
    <tr data-id="${task.id}">
      <td>${task.title}</td>
      <td>${task.text}</td>
      <td>
        <i class="fas fa-trash"></i>
        <i class="fas fa-edit"></i>
        <button class="task-button sort-btn">Done!</button>
        <button class="task-undone-button sort-btn d-none">Make undone</button>

      </td>
    </tr>
    `;
  }

  function alertMessage(className, message) {
    removeAlert();

    const currentAlert = alertTemplate(className, message);

    alertContainer.insertAdjacentHTML("afterbegin", currentAlert);

    setTimeout(removeAlert, 2000);
  }

  function alertTemplate(className, message) {
    return `<div class = "alert ${className}">${message}</div>`;
  }

  function removeAlert() {
    const currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      alertContainer.removeChild(currentAlert);
    }
  }

  // Домашнее задание №6
  // --------------------------------------------------------------------------------------------

  // Удаление тасков по клике на иконку

  function deleteTask(event) {
    let trToEdit = event.target.closest("tr");

    for (let i = 0; i < storage.todo.length; i++) {
      if (
        event.target.classList.contains("fa-trash") &&
        trToEdit.dataset.id === storage.todo[i].id
      ) {
        storage.todo.splice(i, 1);
        table.removeChild(trToEdit);
         if (!storage.todo.length) {
      formWrapper.insertAdjacentElement("beforeend", emptyTasksMessage);
    }
        
      }
    }
  }
  table.addEventListener("click", deleteTask);

  // Выводим сообщение об отсутствии тасков при загрузке страницы, если массив с тасками пустой

  function taskEmpty() {
    if (!storage.todo.length) {
      formWrapper.insertAdjacentElement("beforeend", emptyTasksMessage);
    }
  }

  taskEmpty();

  // Удаляем сообщение об отсутствии тасков, когда добавляем новые таски

  function taskAlert(event) {
    if (
      event.target.classList.contains("btn-primary") &&
      storage.todo.length !== "undefined"
    ) {
      emptyTasksMessage.remove();
    }
  }

  formWrapper.addEventListener("click", taskAlert);

  // Завершенная таска окрашивается в зеленый цвет

  function taskCompleted(event) {
    let closestTr = event.target.closest("tr");

    if (event.target.classList.contains("task-button")) {
      closestTr.classList.add("completed-task", "bg-success");
    }
  }

  table.addEventListener("click", taskCompleted);

  // Добавляем кнопки для отображения всех тасков и незавершенных тасков

  function unfinishedTasksBtn() {
    const unfinishedTasksButton = document.createElement("button");
    unfinishedTasksButton.classList.add("unfinished-tasks", "btn");
    unfinishedTasksButton.textContent = "Unfinished Tasks";
    unfinishedTasksButton.style.marginBottom = "20px";
    formWrapper.insertAdjacentElement("afterbegin", unfinishedTasksButton);
  }

  unfinishedTasksBtn();

  function allTasksBtn() {
    const allTasksButton = document.createElement("button");
    allTasksButton.classList.add("all-tasks", "btn");
    allTasksButton.textContent = "All Tasks";
    allTasksButton.style.marginBottom = "20px";
    formWrapper.insertAdjacentElement("afterbegin", allTasksButton);
  }

  allTasksBtn();

  // Функционал отображения нужных тасков. Добавление и убирание класса 'unfinished-active' понадобится для последней задачи со звездочкой.

  function showUnfinishedTasks() {
    const completedTasks = document.querySelectorAll(".completed-task");
    const allTasks = document.querySelectorAll("tr");
    const unfinishedTasks = document.querySelector(".unfinished-tasks");
    if (event.target.classList.contains("unfinished-tasks")) {
      event.target.classList.add("unfinished-active");

      for (let i = 0; i < completedTasks.length; i++) {
        completedTasks[i].style.display = "none";
      }
    } else if (event.target.classList.contains("all-tasks")) {
      unfinishedTasks.classList.remove("unfinished-active");

      for (let i = 0; i < allTasks.length; i++) {
        allTasks[i].style.display = "table-row";
      }
    }
  }

  formWrapper.addEventListener("click", showUnfinishedTasks);

  // По клику по кнопке Done показываем кнопку для возвращения тасков в статус незавершенных

  function showUndoneButton(event) {
    if (event.target.classList.contains("task-button")) {
      const completedTasks = document.querySelectorAll(".completed-task");
      const unfinishedTasks = document.querySelector(".unfinished-active");
      event.target.nextElementSibling.classList.remove("d-none");
      if (event.target.classList.contains("task-button") && unfinishedTasks) {
        for (let i = 0; i < completedTasks.length; i++) {
          completedTasks[i].style.display = "none";
        }
      }
    } else {
      const closestTableRow = event.target.closest("tr");

      if (event.target.classList.contains("task-undone-button")) {
        closestTableRow.classList.remove("completed-task", "bg-success");
        event.target.classList.add("d-none");
      }
    }
  }

  table.addEventListener("click", showUndoneButton);

  // Сортируем и перезаписываем таблицу

  function tableSort(event) {
    let trArray = [];
    const allTableRows = table.querySelectorAll("tr");

    for (let i = 0; i < allTableRows.length; i++) {
      if (
        event.target.classList.contains("sort-btn") &&
        !allTableRows[i].classList.contains("completed-task")
      ) {
        allTableRows[i].dataset.number = 1;
      } else if (event.target.classList.contains("sort-btn")) {
        allTableRows[i].dataset.number = 2;
      }
    }
    if (event.target.classList.contains("sort-btn")) {
      for (let i = 0; i < allTableRows.length; i++) {
        trArray.push(allTableRows[i]);
      }

      trArray.sort(function(a, b) {
        return a.dataset.number - b.dataset.number;
      });

      for (let i = 0; i < trArray.length; i++) {
        table.appendChild(trArray[i]);
      }
    }
  }

  table.addEventListener("click", tableSort);
})();
