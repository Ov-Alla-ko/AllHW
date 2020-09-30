import { customHttp } from "./httpFunc";
export function newsServiceModule() {
  const apiUrl = "https://newsapi.org";
  const apiKey = "f6c6f3719cb14321bcf55f6e0217ba09";
  return {
    //условие для ресурсов изначально с ошибкой и в документации написано,что мы не можем миксовать их.Но в идеале это бы работало
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
