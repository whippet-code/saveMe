//Importing Firebase and setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// import helpers
import { render, addListItem, removeBook, getInput } from "./helpers.js";

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
  searchResultsElement.innerHTML = "";
  render(getInput());
};

// Event Listeners
// search button
document
  .getElementById("searchButton")
  .addEventListener("click", searchRequest);

// pressing Enter key in input box (search)
document
  .getElementById("searchInput")
  .addEventListener("keydown", function (ev) {
    if (ev.key === "Enter") {
      searchRequest();
    }
  });

// search results list item, add to list on click
document.getElementById("foundBooks").addEventListener("click", function (e) {
  // But only alert for elements that have an alert-button class
  if (e.target.classList.contains("found-book")) {
    addListItem(e.target.innerHTML);
    e.target.remove();
  }
});

// saved Books list items, remove on click
document.getElementById("savedBooks").addEventListener("click", function (e) {
  // Only apply for elements that have saved class
  if (e.target.classList.contains("saved")) {
    removeBook(e.target.id);
  }
});
