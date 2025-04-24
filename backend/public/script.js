const baseURL = "http://localhost:3000/api/library";
let allBooks = [];
function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

window.onload = () => {
  getAllBooks();
};

async function getAllBooks() {
  const res = await fetch(baseURL + "/get-all-books");
  const books = await res.json();
  const list = document.getElementById("bookList");
  list.innerHTML = "";
console.log(books);
  books.forEach(book => {
    const li = document.createElement("li");
    li.textContent = `ID: ${book.id}, ${book.title} by ${book.author} - Qty: ${book.quantity}`;
    list.appendChild(li);
  });
  filterBooks();
}

async function addUser() {
  const userId = document.getElementById("userId").value;
  const name = document.getElementById("name").value;
  const courseId = document.getElementById("courseId").value;
  const semester = +document.getElementById("semester").value;

  await fetch(baseURL + "/add-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, name, courseId, semester }),
  });

  closeModal("addUserModal");
  
}

async function addBook() {
  const id = +document.getElementById("bookId").value;
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const quantity = +document.getElementById("quantity").value;

  await fetch(baseURL + "/add-book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, title, author, quantity }),
  });

  closeModal("addBookModal");
  getAllBooks();
  
}

async function borrowBook() {
  const userId = document.getElementById("borrowUserId").value;
  const bookId = +document.getElementById("borrowBookId").value;

  await fetch(baseURL + "/borrow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, bookId }),
  });

  closeModal("borrowModal");
  getAllBooks();
  
}

async function returnBook() {
  const userId = document.getElementById("returnUserId").value;
  const bookId = +document.getElementById("returnBookId").value;

  await fetch(baseURL + "/return", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, bookId }),
  });

  closeModal("returnModal");
  getAllBooks();
  
}

async function getHistory() {
  const userId = document.getElementById("historyUserId").value;
  const res = await fetch(baseURL + `/history/${userId}`);
  const history = await res.json();
  const list = document.getElementById("historyList");
  list.innerHTML = "";

  if (!Array.isArray(history) || history.length === 0) {
    list.innerHTML = `<li>No history found.</li>`;
    return;
  }

  history.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `Book ID: ${entry.bookId}, Borrowed on: ${entry.date}`;
    list.appendChild(li);
  });
}



function filterBooks() {
  const searchText = document.getElementById("searchInput").value.toLowerCase();
  const filterOption = document.getElementById("filterOption").value;
  const sortOption = document.getElementById("sortOption").value;

  let filtered = [...allBooks];

  // 🔍 Search
  if (searchText) {
    filtered = filtered.filter(book =>
      book.title.toLowerCase().includes(searchText) ||
      book.author.toLowerCase().includes(searchText)
    );
  }

  // 🔃 Filter
  if (filterOption === "available") {
    filtered = filtered.filter(book => book.quantity > 0);
  }

  // 🔢 Sort
  if (sortOption === "title") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "quantity") {
    filtered.sort((a, b) => b.quantity - a.quantity);
  }

  // Render to DOM
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  if (filtered.length === 0) {
    list.innerHTML = "<li>No books match your criteria.</li>";
    return;
  }

  filtered.forEach(book => {
    const li = document.createElement("li");
    li.textContent = `ID: ${book.id}, ${book.title} by ${book.author} - Qty: ${book.quantity}`;
    list.appendChild(li);
  });
}

