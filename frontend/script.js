const BASE_URL = "https://team-task-manager-production-7a1c.up.railway.app";

let projects = [];
let tasks = [];

// ================= AUTH =================

// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (res.ok) {
    window.location.href = "dashboard.html";
  } else {
    const data = await res.json();
    alert(data.message || "Login failed");
  }
}

// SIGNUP
async function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  if (res.ok) {
    alert("Signup successful");
    window.location.href = "index.html";
  } else {
    const data = await res.json();
    alert(data.message || "Signup failed");
  }
}

// ================= PROJECT =================

async function createProject() {
  const title = document.getElementById("projectTitle").value;

  await fetch(`${BASE_URL}/api/projects/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, createdBy: "Duyesh" })
  });

  loadData();
}

async function deleteProject(id) {
  await fetch(`${BASE_URL}/api/projects/delete/${id}`, {
    method: "DELETE"
  });

  loadData();
}

// ================= TASK =================

async function createTask() {
  const projectId = document.getElementById("projectSelect").value;

  if (!projectId) {
    alert("Select a project first!");
    return;
  }

  const title = document.getElementById("taskTitle").value;
  const assignedTo = document.getElementById("assignedTo").value;

  await fetch(`${BASE_URL}/api/tasks/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, projectId, assignedTo })
  });

  loadData();
}

async function deleteTask(id) {
  await fetch(`${BASE_URL}/api/tasks/delete/${id}`, {
    method: "DELETE"
  });

  loadData();
}

async function toggleStatus(id, currentStatus) {
  const newStatus = currentStatus === "completed" ? "pending" : "completed";

  await fetch(`${BASE_URL}/api/tasks/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus })
  });

  loadData();
}

async function addComment(id) {
  const comment = document.getElementById(`c-${id}`).value;

  await fetch(`${BASE_URL}/api/tasks/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment })
  });

  loadData();
}

// ================= LOAD =================

async function loadData() {
  const projectRes = await fetch(`${BASE_URL}/api/projects`);
  const taskRes = await fetch(`${BASE_URL}/api/tasks`);

  projects = await projectRes.json();
  tasks = await taskRes.json();

  populateProjects();
  display();
}

function populateProjects() {
  const select = document.getElementById("projectSelect");
  if (!select) return;

  select.innerHTML = "";

  projects.forEach(project => {
    const option = document.createElement("option");
    option.value = project._id;
    option.textContent = project.title;
    select.appendChild(option);
  });
}

// ================= UI =================

function display() {
  const container = document.getElementById("projectContainer");
  if (!container) return;

  container.innerHTML = "";

  projects.forEach(project => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h4>
        ${project.title}
        <button onclick="deleteProject('${project._id}')">Delete</button>
      </h4>
    `;

    const ul = document.createElement("ul");

    const projectTasks = tasks.filter(
      t => t.projectId === project._id
    );

    projectTasks.forEach(task => {
      const li = document.createElement("li");

      const isCompleted = task.status === "completed";
      const color = isCompleted ? "green" : "orange";
      const text = isCompleted ? "Mark Pending" : "Mark Complete";

      li.innerHTML = `
        <span style="color:${color}">●</span>
        <strong>${task.title}</strong>
        <br>
        Assigned: ${task.assignedTo}
        <br>
        Comment: ${task.comment || "None"}
        <br><br>

        <button onclick="toggleStatus('${task._id}', '${task.status}')">${text}</button>
        <button onclick="deleteTask('${task._id}')">Delete</button>

        <br><br>

        <input id="c-${task._id}" placeholder="Add comment">
        <button onclick="addComment('${task._id}')">Save</button>
      `;

      ul.appendChild(li);
    });

    div.appendChild(ul);
    container.appendChild(div);
  });
}