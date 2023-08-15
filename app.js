// build a quick test div to see if the app is working
const app = document.getElementById("app");

// test api call to google.books api

const url = "https://www.googleapis.com/books/v1/volumes?q=";

// DOM elements
const searchSubmit = document.getElementById("searchBtn");

const getBooks = async (search) => {
  const res = await fetch(url + search + "&maxResults=5");
  const data = await res.json();
  return data.items;
};

// function to get user input and save as search string
const getInput = () => {
  // protect against empty input field
  console.log("Here");
  const userInput = "";
  userInput = document.getElementById("searchInput").value;
  if (userInput != "") {
    console.log(userInput);
    // for now just return the string
    return userInput;
  }
  console.log("User Input empty");
};

const buildBookHTML = async () => {
  let bookListHTML = "";
  const searchResults = await getBooks("author:Simon Reeve");

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

// add event listeners
searchSubmit.addEventListener("click", getInput);

render(app);
