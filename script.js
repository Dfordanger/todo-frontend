const API_URL = 'https://todo-production-a3e0.up.railway.app';

let token = '';

async function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.status === 201) {
        alert('User registered successfully');
    } else {
        alert(data.error);
    }
}

async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.status === 200) {
        token = data.access_token;
        alert('Login successful');
        document.querySelector('.todo-section').style.display = 'block';
    } else {
        alert(data.error);
    }
}

async function addTodo() {
    const task = document.getElementById('todo-task').value;

    const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ task })
    });

    if (response.status === 201) {
        alert('Todo added successfully');
        getTodos();
    }
}

async function getTodos() {
    const response = await fetch(`${API_URL}/todos`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const todos = await response.json();
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerText = `${todo.task} - ${todo.completed ? 'Completed' : 'Not completed'}`;
        todoList.appendChild(li);
    });
}
