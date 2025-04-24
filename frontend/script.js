const baseURL = "http://localhost:3000/api/library";

async function addUser() {
  const userId = document.getElementById("userId").value;
  await fetch(`${baseURL}/add-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  alert("User added");
}

async function addBook() {
  const id = +document.getElementById("bookId").value;
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const quantity = +document.getElementById("quantity").value;
  await fetch(`${baseURL}/add-book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, title, author, quantity }),
  });
  alert("Book added");
}

async function borrowBook() {
  const userId = document.getElementById("borrowUserId").value;
  const bookId = +document.getElementById("borrowBookId").value;
  await fetch(`${baseURL}/borrow`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, bookId }),
  });
  alert("Book borrowed");
}

async function returnBook() {
  const userId = document.getElementById("returnUserId").value;
  const bookId = +document.getElementById("returnBookId").value;
  await fetch(`${baseURL}/return`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, bookId }),
  });
  alert("Book returned");
}

async function getHistory() {
    const userId = document.getElementById("historyUserId").value;
    const res = await fetch(`${baseURL}/history/${userId}`);
    const history = await res.json();
  
    console.log("📜 Received history:", history); // 👈 Check the type in browser console
  
    const list = document.getElementById("historyList");
    list.innerHTML = "";
  
    if (!Array.isArray(history) || history.length === 0) {
      list.innerHTML = `<li>No history found for user ${userId}</li>`;
      return;
    }
  
    history.forEach(entry => {
      const li = document.createElement("li");
      li.textContent = `Book ID: ${entry.bookId}, Borrowed on: ${entry.date}`;
      list.appendChild(li);
    });
  }
  
async function getUser() {
    const userId = document.getElementById("searchUserId").value;
  
    const res = await fetch(baseURL + `/get-user/${userId}`);
    const resultDiv = document.getElementById("userResult");
  
    if (res.ok) {
      const user = await res.json();
      resultDiv.innerHTML = `
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Course ID:</strong> ${user.courseId}</p>
        <p><strong>Semester:</strong> ${user.semester}</p>
      `;
    } else {
      resultDiv.textContent = "User not found!";
    }
  }
  