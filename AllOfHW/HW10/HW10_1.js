const http = (function() {
  function get(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.addEventListener("load", () => {
      cb(JSON.parse(xhr.responseText));
    });

    xhr.send();
  }

  function post(url, body, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.addEventListener("load", () => {
      cb(JSON.parse(xhr.responseText));
    });

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(body));
  }

  return {
    get,
    post
  };
})();
function UserList(selector) {
  element = document.querySelector(selector);
}
function setUsers(list) {
  list.forEach(user => {
    const pEl = document.createElement("p");
    pEl.classList.add("new");
    pEl.innerHTML = `<p href=# class="list-group-item-action" >Name: ${user.name}</p> `;
    element.appendChild(pEl);
    pEl.addEventListener("click", () => {
      const newpEl = document.createElement("a");
      newpEl.classList.add("second");
      newpEl.innerHTML = `<a class="list-group-item" >Info: ${JSON.stringify(
        user
      )}</>`;
      pEl.appendChild(newpEl);
    });
  });
  return this;
}
function handleResponse(list) {
  setUsers(list);
}
window.onload = function getUsers() {
  element.innerHTML = "";
  http.get("https://jsonplaceholder.typicode.com/users", handleResponse);
};

const UsersList = new UserList("#users-list");


let form = document.forms[0];
document.getElementById("send").onclick = sendHandler;

function sendHandler() {
  let user = {
    name: form["name"].value,
    email: form["email"].value,
    username: form["username"].value,
    phone: form["phone"].value,
    website: form["website"].value
  };

  postJSONAsync("https://jsonplaceholder.typicode.com/users", user);
  alert("Пользователь зарегистрирован!");
  const pEl = document.createElement("p");
  pEl.classList.add("new");
  pEl.innerHTML = `<p href=# class="list-group-item-action" >Name: ${user.name}</p> `;
  element.appendChild(pEl);
  form.reset();
}
function postJSONAsync(url, obj) {
  let init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(obj)
  };
  fetch(url, init);}
