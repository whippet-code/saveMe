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
      <li onclick="addListItem('${book.volumeInfo.title}')">${book.volumeInfo.title} By - ${book.volumeInfo.authors[0]}</li></br>`;
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

// function to trigger searchRequest on pressing return from input

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

// event listener for pressing return in input box (search)
document
  .getElementById("searchInput")
  .addEventListener("keydown", function (ev) {
    if (ev.key == "Enter") {
      return searchRequest();
    }
  });

// function to take user input and add new book to list
function addListItem(book) {
  document.getElementById("savedBooks").innerHTML += `
    <li onclick="removeBook('${book.replaceAll(
      " ",
      ""
    )}')" id=${book.replaceAll(" ", "")}>${book}</li>`;
}

document.getElementById("add-to-list").addEventListener("click", () => {
  const addBook = document.getElementById("item-to-add").value;
  addListItem(addBook);
  //clear input
  document.getElementById("item-to-add").value = "";
});
