const baseURL = "http://localhost:3000/api/library";

async function loadAdminData() {
  const bookRes = await fetch(`${baseURL}/all-books-by-department`);
  const userRes = await fetch(`${baseURL}/all-users-by-department`);

  const books = await bookRes.json();
  const users = await userRes.json();

  renderGrouped("booksByDept", books, "Books");
  renderGrouped("usersByDept", users, "Users");
}

function renderGrouped(containerId, groupedData, type) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  Object.keys(groupedData).forEach(dept => {
    const section = document.createElement("div");
    section.innerHTML = `<h3>${dept}</h3><ul>${groupedData[dept].map(item => {
      if (type === "Books") {
        return `<li>${item.title} by ${item.author} (Qty: ${item.quantity})</li>`;
      } else {
        return `<li>${item.name} (${item.userId}) - ${item.courseId}</li>`;
      }
    }).join("")}</ul>`;
    container.appendChild(section);
  });
}

window.onload = loadAdminData;
