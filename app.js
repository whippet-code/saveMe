// build a quick test div to see if the app is working
const app = document.getElementById("app");

// test api call to google.books api

const url = "https://www.googleapis.com/books/v1/volumes?q=";

const getBooks = async (search) => {
  const res = await fetch(url + search);
  const data = await res.json();
  return data.items;
};

const buildBookHTML = async () => {
  let bookListHTML = "";
  const searchResults = await getBooks("Harry%Potter%and%the+inauthor:Rowling");

  for (let book of searchResults) {
    console.log(book.volumeInfo);
    bookListHTML += `<li>${book.volumeInfo.title} By - ${book.volumeInfo.authors[0]}</li></br>`;
  }

  return bookListHTML;
};

const render = async (element) => {
  const innerHTML = await buildBookHTML();
  element.innerHTML += innerHTML;
};

render(app);
