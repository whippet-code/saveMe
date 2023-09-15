//Importing Firebase and setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://saveme-76e9d-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const bookListInDB = ref(database, bookList);

// build a quick test div to see if the app is working
const searchResultsElement = document.getElementById("foundBooks");

// function to get user input and save as search string
const getInput = () => {
  const searchInput = document.getElementById("searchInput").value;
  // verify input
  if (searchInput === "") {
    alert("Please enter a search term");
    return;
  }
  // clear field
  document.getElementById("searchInput").value = "";
  return searchInput;
};

const getBooks = async (search) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=5`;

  const res = await fetch(url);
  const data = await res.json();

  return data.items;
};

// build the HTML for book list from api response
const buildBookHTML = async (searchInput) => {
  let bookListHTML = "";
  const searchResults = await getBooks(searchInput);

  for (let book of searchResults) {
    bookListHTML += `
      <li onclick="
          addListItem('${book.volumeInfo.title} - ${book.volumeInfo.authors[0]}')
      ">${book.volumeInfo.title} By - ${book.volumeInfo.authors[0]}</li></br>`;
  }

  return bookListHTML;
};

// render the booklist
const render = async (searchInput) => {
  const innerHTML = await buildBookHTML(searchInput);
  searchResultsElement.innerHTML = innerHTML;
};

// function to handle search submit
const searchRequest = () => {
  render(getInput());
};

// Function to add a book to the saved list
const addListItem = (book) => {
  const bookId = book.replaceAll(" ", "");
  document.getElementById("savedBooks").innerHTML += `
    <li onclick="removeBook('${bookId}')" id="${bookId}">${book}</li>`;
};

//function to remove book from list
const removeBook = (bookId) => {
  const bookEl = document.getElementById(bookId);
  bookEl.remove();
  // need to remove from DB also
};

// event listener for search button
document
  .getElementById("searchButton")
  .addEventListener("click", searchRequest);
