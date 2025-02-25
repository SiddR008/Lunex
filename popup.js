const backgrounds = ['images/bg1.jpg', 'images/bg2.jpg', 'images/bg3.jpg'];
document.body.style.backgroundImage = `url('${backgrounds[Math.floor(Math.random() * backgrounds.length)]}')`;

// Display Current Time
function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    timeElement.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateTime, 1000);
updateTime();

// Display Greeting
const greetingElement = document.getElementById('greeting');
const hour = new Date().getHours();
if (hour < 12) {
    greetingElement.textContent = "Good Morning!";
} else if (hour < 18) {
    greetingElement.textContent = "Good Afternoon!";
} else {
    greetingElement.textContent = "Good Evening!";
}

// Daily Focus
const focusInput = document.getElementById('focusInput');
const focusDisplay = document.getElementById('focusDisplay');

focusInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && focusInput.value) {
        localStorage.setItem('dailyFocus', focusInput.value);
        displayFocus();
    }
});

function displayFocus() {
    const focus = localStorage.getItem('dailyFocus');
    if (focus) {
        focusDisplay.textContent = `Today's Focus: ${focus}`;
        focusInput.style.display = 'none';
    }
}
displayFocus();

// To-Do List
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && taskInput.value) {
        const task = taskInput.value;
        addTask(task);
        saveTasks();
        taskInput.value = '';
    }
});

function addTask(task) {
    const li = document.createElement('li');
    li.textContent = task;
    li.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });
    taskList.appendChild(li);
}

function saveTasks() {
    const tasks = Array.from(taskList.children).map(li => li.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(addTask);
}
loadTasks();
