import { newsServiceModule } from "./urlModule";
import { showLoader, hideLoader } from "./serviceModule";
hideLoader();
const newsService = newsServiceModule();
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
const newsContainer = document.querySelector(".news-container .row");
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
