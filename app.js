// build a quick test div to see if the app is working
const searchResultsElement = document.getElementById("foundBooks");

// test api call to google.books api

const url = "https://www.googleapis.com/books/v1/volumes?q=";

const getBooks = async (search) => {
  console.log(url + search + "&maxResults=5");
  const res = await fetch(url + search + "&maxResults=5");
  const data = await res.json();
  return data.items;
};

// function to get user input and save as search string
const getInput = () => {
  const searchInput = document.getElementById("searchInput").value;
  // verify input
  if (searchInput === "") {
    alert("Please enter a search term");
    return;
  }

  render(searchInput);
};

const buildBookHTML = async (searchInput) => {
  let bookListHTML = "";
  const searchResults = await getBooks(searchInput);
  console.log(searchResults);

  for (let book of searchResults) {
    bookListHTML += `<li>${book.volumeInfo.title} By - ${book.volumeInfo.authors[0]}</li></br>`;
  }

  return bookListHTML;
};

document.getElementById("searchButton").addEventListener("click", () => {
  getInput();
});

const render = async (searchInput) => {
  const innerHTML = await buildBookHTML(searchInput);
  searchResultsElement.innerHTML += innerHTML;
};
