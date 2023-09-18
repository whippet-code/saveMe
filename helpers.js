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
  document.getElementById("savedBooks").innerHTML += `
    <li onclick="removeBook('${bookId}')" id="${bookId}">${book}</li>`;
};

// Function to build HTML for book list from API response
const buildBookHTML = async (searchInput) => {
  let bookListHTML = "";
  const searchResults = await getBooks(searchInput);

  for (let book of searchResults) {
    const authors = book.volumeInfo.authors
      ? book.volumeInfo.authors[0]
      : "Unknown Author";
    bookListHTML += `
      <li onclick="addListItem('${book.volumeInfo.title} - ${authors}')">
        ${book.volumeInfo.title} By - ${authors}
      </li>`;
  }

  return bookListHTML;
};

// Function to render the book list on the page
const render = async (searchInput) => {
  const innerHTML = await buildBookHTML(searchInput);
  searchResultsElement.innerHTML = innerHTML;
};

// Function to handle search request
const searchRequest = () => {
  render(getInput());
};

export {
  getInput,
  getBooks,
  addListItem,
  removeBook,
  buildBookHTML,
  render,
  searchRequest,
};