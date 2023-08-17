// build a quick test div to see if the app is working
const app = document.getElementById("foundBooks");

// test api call to google.books api

const url = "https://www.googleapis.com/books/v1/volumes?q=";

const getBooks = async (search) => {
  const res = await fetch(url + search + "&maxResults=5");
  const data = await res.json();
  return data.items;
};

// function to get user input and save as search string
const getInput = () => {
  const searchInput = document.getElementById("searchInput").value;
  console.log(searchInput);
  return searchInput;
};

const buildBookHTML = async () => {
  let bookListHTML = "";
  const searchResults = await getBooks("author:Simon Reeve");

  for (let book of searchResults) {
    bookListHTML += `<li>${book.volumeInfo.title} By - ${book.volumeInfo.authors[0]}</li></br>`;
  }

  return bookListHTML;
};

document.getElementById("searchButton").addEventListener("click", () => {
  console.log("clicked");
});

const render = async (element) => {
  const innerHTML = await buildBookHTML();
  element.innerHTML += innerHTML;
};

render(app);
