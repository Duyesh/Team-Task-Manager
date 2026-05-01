const BASE_URL = "http://localhost:5000";

let projects = [];
let tasks = [];

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

// CREATE PROJECT
async function createProject() {
  const title = document.getElementById("projectTitle").value;

  const res = await fetch(`${BASE_URL}/api/projects/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      createdBy: "Duyesh"
    })
  });

  await res.json();
  alert("Project created");

  loadData();
}

// POPULATE DROPDOWN
function populateProjects() {
  const select = document.getElementById("projectSelect");
  select.innerHTML = "";

  projects.forEach(project => {
    const option = document.createElement("option");
    option.value = project._id;
    option.textContent = project.title;
    select.appendChild(option);
  });
}

// CREATE TASK
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

  alert("Task created");
  loadData();
}

// DELETE TASK
async function deleteTask(id) {
  await fetch(`${BASE_URL}/api/tasks/delete/${id}`, {
    method: "DELETE"
  });

  loadData();
}

// DELETE PROJECT 
async function deleteProject(id) {
  await fetch(`${BASE_URL}/api/projects/delete/${id}`, {
    method: "DELETE"
  });

  loadData();
}

// LOAD DATA
async function loadData() {
  try {
    const projectRes = await fetch(`${BASE_URL}/api/projects`);
    const taskRes = await fetch(`${BASE_URL}/api/tasks`);

    projects = await projectRes.json();
    tasks = await taskRes.json();

    populateProjects();
    display();
  } catch (err) {
    console.error(err);
    alert("Failed to load data");
  }
}

// DISPLAY PROJECTS + TASKS
function display() {
  const container = document.getElementById("projectContainer");
  container.innerHTML = "";

  projects.forEach(project => {
    const div = document.createElement("div");

    div.innerHTML = `
        <h4>${project.title}</h4>
        <button onclick="deleteProject('${project._id}')">
            Delete Project
        </button>
    `;

    const ul = document.createElement("ul");

    const projectTasks = tasks.filter(
      t => t.projectId === project._id
    );

    projectTasks.forEach(task => {
      const li = document.createElement("li");

      const isCompleted = task.status === "completed";
      const statusColor = isCompleted ? "green" : "orange";
      const buttonText = isCompleted ? "Mark Pending" : "Mark Complete";

      li.innerHTML = `
        <span style="color:${statusColor}; font-size:18px;">●</span>
        <strong>${task.title}</strong> (${task.status})
        <br>
        Assigned: ${task.assignedTo}
        <br>
        Comment: ${task.comment || "None"}
        <br><br>

        <button onclick="toggleStatus('${task._id}', '${task.status}')">
          ${buttonText}
        </button>

        <button onclick="deleteTask('${task._id}')">
          Delete
        </button>

        <br><br>

        <input placeholder="Add comment" id="c-${task._id}">
        <button onclick="addComment('${task._id}')">Save</button>
      `;

      ul.appendChild(li);
    });

    div.appendChild(ul);
    container.appendChild(div);
  });
}

// TOGGLE STATUS
async function toggleStatus(id, currentStatus) {
  const newStatus = currentStatus === "completed" ? "pending" : "completed";

  await fetch(`${BASE_URL}/api/tasks/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus })
  });

  loadData();
}

// ADD COMMENT
async function addComment(id) {
  const comment = document.getElementById(`c-${id}`).value;

  await fetch(`${BASE_URL}/api/tasks/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment })
  });

  loadData();
}