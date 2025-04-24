document.addEventListener('DOMContentLoaded', () => {
  const form  = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list  = document.getElementById('todo-list');

  // Load saved tasks
  const saved = JSON.parse(localStorage.getItem('tasks')) || [];
  saved.forEach(task => addTodo(task.text, task.completed, false));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addTodo(text, false, true);
    input.value = '';
  });

  function saveTasks() {
    const tasks = [];
    list.querySelectorAll('li').forEach(li => {
      tasks.push({
        text: li.querySelector('span').textContent,
        completed: li.classList.contains('completed'),
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function addTodo(text, completed = false, save = true) {
    const li = document.createElement('li');
    if (completed) li.classList.add('completed');

    const check = document.createElement('i');
    check.className = 'fa-regular fa-circle-check';

    const span = document.createElement('span');
    span.textContent = text;

    const trash = document.createElement('i');
    trash.className = 'fa-solid fa-trash';

    li.append(check, span, trash);
    list.prepend(li);

    check.addEventListener('click', () => {
      li.classList.toggle('completed');
      saveTasks();
    });

    // ← Here’s the change: use setTimeout for guaranteed removal
    trash.addEventListener('click', () => {
      li.classList.add('removing');
      setTimeout(() => {
        li.remove();
        saveTasks();
      }, 300); // match this to your shake animation duration
    });

    if (save) saveTasks();
  }
});
