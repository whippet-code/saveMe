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
const bookListInDB = ref(database, "bookList");

// Get references to HTML elements
const searchResultsElement = document.getElementById("foundBooks");

// Function to handle search request
const searchRequest = () => {
  render(getInput());
};

// Event Listeners

// Event listener for search button
document
  .getElementById("searchButton")
  .addEventListener("click", searchRequest);

// Event listener for pressing Enter key in input box (search)
document
  .getElementById("searchInput")
  .addEventListener("keydown", function (ev) {
    if (ev.key === "Enter") {
      searchRequest();
    }
  });

// Event listeners for search results list
document.getElementById("foundBooks").addEventListener("click", function (e) {
  // But only alert for elements that have an alert-button class
  if (e.target.classList.contains("found-book")) {
    addListItem(e.target.innerHTML);
  }
});

//Listener for saved Books list
document.getElementById("savedBooks").addEventListener("click", function (e) {
  // Only apply for elements that have saved class
  if (e.target.classList.contains("saved")) {
    removeBook(e.target.id);
  }
});

// Function to get user input and validate
const getInput = () => {
  const searchInput = document.getElementById("searchInput").value;
  if (searchInput === "") {
    alert("Please enter a search term");
    return;
  }
  // Clear input field after reading the value
  document.getElementById("searchInput").value = "";
  return searchInput;
};

// Function to fetch books from API
const getBooks = async (search) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=5`;
  const res = await fetch(url);
  const data = await res.json();
  return data.items;
};

// Function to remove a book from the list
const removeBook = (bookId) => {
  const bookEl = document.getElementById(bookId);
  if (bookEl) {
    bookEl.remove();
    // Further actions, like removing from the database, can be added here
  }
};

// Function to add a book to the saved list
const addListItem = (book) => {
  const bookId = book.replaceAll(" ", "");
  const savedBookList = document.getElementById("savedBooks");

  // generate new book to add to list
  let newBook = document.createElement("li");
  newBook.id = bookId;
  newBook.innerText = book;
  // add class
  newBook.setAttribute("class", "saved");

  savedBookList.appendChild(newBook);
};

// function to build ul with li nodes
const buildFoundBookList = async (searchInput) => {
  // get the array of books from search via api call
  const searchResults = await getBooks(searchInput);

  // save ul node to append with new li
  const resultsList = document.querySelector("#foundBooks");

  // loop found books arrray
  for (let book of searchResults) {
    // build a new li node
    let newLi = document.createElement("li");

    // deal with multiple authors or unknown
    const authors = book.volumeInfo.authors
      ? book.volumeInfo.authors[0]
      : "Unknown Author";

    // add id to new li
    newLi.setAttribute("id", book.id);

    // add class
    newLi.setAttribute("class", "found-book");

    // add li text
    newLi.innerText = book.volumeInfo.title + " - " + authors;

    // append ul with newLi
    resultsList.appendChild(newLi);
  }
};

// Function to render the book list on the page
const render = async (searchInput) => {
  // const innerHTML = await buildBookHTML(searchInput);
  // searchResultsElement.innerHTML = innerHTML;
  buildFoundBookList(searchInput);
};
