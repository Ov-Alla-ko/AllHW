// При изменении формы выводим полученные новости или если новостей нет то выводим уведомление
// При каждой загрузке новостей показывать прелодер
export function showLoader() {
  const template = `
  <div class="progress">
    <div class="indeterminate"></div>
  </div>
  `;

  document.body.insertAdjacentHTML("afterbegin", template);
}

export function hideLoader() {
  const loader = document.querySelector(".progress");
  if (loader) {
    loader.remove();
  }
}
