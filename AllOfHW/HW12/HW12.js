function http() {
  return {
    get(url, cb) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.addEventListener("load", () => {
          if (Math.floor(xhr.status / 100) !== 2) {
            cb(`Error. Status code: ${xhr.status}`, xhr);
            return;
          }
          const response = JSON.parse(xhr.responseText);
          cb(null, response);
        });

        xhr.addEventListener("error", () => {
          cb(`Error. Status code: ${xhr.status}`, xhr);
        });

        xhr.send();
      } catch (error) {
        cb(error);
      }
    },
    post(url, body, headers, cb) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.addEventListener("load", () => {
          if (Math.floor(xhr.status / 100) !== 2) {
            cb(`Error. Status code: ${xhr.status}`, xhr);
            return;
          }
          const response = JSON.parse(xhr.responseText);
          cb(null, response);
        });

        xhr.addEventListener("error", () => {
          cb(`Error. Status code: ${xhr.status}`, xhr);
        });

        if (headers) {
          Object.entries(headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
          });
        }

        xhr.send(JSON.stringify(body));
      } catch (error) {
        cb(error);
      }
    }
  };
}
//1. Переписать данную функцию на fetch и промисы
function status(response) {
  if (Math.floor(response.status / 100) == 2) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.status));
  }
}

function json(response) {
  return response.json();
}

fetch("https://jsonplaceholder.typicode.com/posts")
  .then(status)
  .then(json)
  .then(function(data) {
    console.log("Get", data);
  })
  .catch(function(error) {
    console.log("Error. Status code:", error);
  });

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "post",
   //headers:'',
  //body:''
})
  .then(json)
  .then(function(data) {
    console.log("Post", data);
  })
  .catch(function(error) {
    console.log("Error. Status code:", error);
  });
