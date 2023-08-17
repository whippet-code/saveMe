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
    bookListHTML += `<li>${book.volumeInfo.title} By - ${book.volumeInfo.authors[0]}</li></br>`;
  }

  return bookListHTML;
};

// render the booklist
const render = async (searchInput) => {
  const innerHTML = await buildBookHTML(searchInput);
  searchResultsElement.innerHTML += innerHTML;
};

// function to handle search submit
const searchRequest = () => {
  render(getInput());
};

// event listener for search button
document.getElementById("searchButton").addEventListener("click", () => {
  searchRequest();
});
