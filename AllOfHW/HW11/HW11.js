function customHttp() {
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
          // cb(err, response)
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

function newsServiceModule() {
  const apiUrl = "https://newsapi.org";
  const apiKey = "f6c6f3719cb14321bcf55f6e0217ba09";
  return {
    //условие для ресурсов изначально с ошибкой.В документации APINews написано, что нет возможности миксовать по стране и ресурсу. Я просто добавила поиск по ресурсу без доп вещей
    sourcesNews(source, cb) {
      http.get(`${apiUrl}/v2/sources=${source}?apiKey=${apiKey}`, cb);
    },

    topHeadlines(country, cb) {
      http.get(
        `${apiUrl}/v2/top-headlines?country=${country}&apiKey=${apiKey}`,
        cb
      );
    },
    selectCategoryUa(category, cb) {
      http.get(
        `${apiUrl}/v2/top-headlines?country=ua&category=${category}&apiKey=${apiKey}`,
        cb
      );
    },
    selectCategoryUs(category, cb) {
      http.get(
        `${apiUrl}/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`,
        cb
      );
    },
    everything(text, cb) {
      http.get(`${apiUrl}/v2/everything?q=${text}&apiKey=${apiKey}`, cb);
    }
  };
}

const http = customHttp();
const newsService = newsServiceModule();

const newsContainer = document.querySelector(".news-container .row");
const form = document.forms["newsControls"];
const countrySelect = form["country"];
const searchInput = form["search"];
const categorySelect = form["category"];
const sources = form["source"];

//  init selects
document.addEventListener("DOMContentLoaded", function() {
  M.AutoInit();
  showLoader();
  loadNews();
});

form.addEventListener("submit", e => {
  e.preventDefault();
  showLoader();
  if (sources.value) {
    newsService.sourcesNews(sources.value, onGetResponse);
  }
  if (searchInput.value) {
    newsService.everything(searchInput.value, onGetResponse);
  } else {
    if (countrySelect.value == "ua") {
      newsService.selectCategoryUa(categorySelect.value, onGetResponse);
    } else if (countrySelect.value == "us") {
      newsService.selectCategoryUs(categorySelect.value, onGetResponse);
    }
  }
});

// При загрузке мы должны получить дефолтные новости
//  - функция loadNews
//  - OnGetResponse
//  - newstTemplate
function loadNews() {
  newsService.topHeadlines(countrySelect.value, onGetResponse);
}

function onGetResponse(err, res) {
  hideLoader();
  if (err) {
    console.warn(err);
    return;
  }

  if (!res.articles.length) {
    M.toast({ html: "Новости по вашему запросу не найдены!" });
    return;
  }

  renderNews(res.articles);
}

function renderNews(news) {
  clearContainer();

  let fragment = "";
  news.forEach(item => {
    const template = newsTemplate(item);
    fragment += template;
  });

  newsContainer.insertAdjacentHTML("afterbegin", fragment);
}

function clearContainer() {
  newsContainer.innerHTML = "";
}

function newsTemplate({ title, urlToImage, url, description }) {
  return `
  <div class="col s12">
    <div class="card">
      <div class="card-image">
        <img src="${urlToImage}">
        <span class="card-title">${title || ""}</span>
      </div>
      <div class="card-content">
        <p>${description || ""}</p>
      </div>
      <div class="card-action">
        <a href="${url}">Read more</a>
      </div>
    </div>
  </div>
  `;
}

// При изменении формы выводим полученные новости или если новостей нет то выводим уведомление
// При каждой загрузке новостей показывать прелодер
function showLoader() {
  const template = `
  <div class="progress">
    <div class="indeterminate"></div>
  </div>
  `;

  document.body.insertAdjacentHTML("afterbegin", template);
}

function hideLoader() {
  const loader = document.querySelector(".progress");
  if (loader) {
    loader.remove();
  }
}
