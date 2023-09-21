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
  buildFoundBookList(searchInput);
};

export {
  render,
  buildFoundBookList,
  addListItem,
  removeBook,
  getBooks,
  getInput,
};
