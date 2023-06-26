const API_KEY = "8584dcc5c8454672ae7c7889e4ad878d";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("world"));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} • ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
  setTimeout(() => {
    document.getElementById("atopnav").click();
  }, 1000);
});

searchText.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchButton.click();
  }
});

/* --------------Navbar button for small screen -----------------*/

const menuulbar = document.getElementById("menuulbar");

menuulbar.style.maxHeight = "0px";

function menubar() {
  if (menuulbar.style.maxHeight == "0px") {
    menuulbar.style.maxHeight = "250px";
  } else {
    menuulbar.style.maxHeight = "0px";
  }
}

/* ---------------Click navbar items get result and also go to top (unfortunately i target ul)--------------- */

const clickLinkNav = document.getElementById("ulBarForTop");

clickLinkNav.addEventListener("click", () => {
  document.getElementById("atopnav").click();
});
