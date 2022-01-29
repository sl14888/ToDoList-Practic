let addMessage = document.querySelector('.message'),
  addButton = document.querySelector('.add'),
  todo = document.querySelector('.todo');

let toDoList = [];

if (localStorage.getItem('todo')) {
  toDoList = JSON.parse(localStorage.getItem('todo'));
  displayMessages();
}

addButton.addEventListener('click', function () {
  let newToDo = {
    todo: addMessage.value,
    checked: true,
    important: false,
  };
  toDoList.push(newToDo);
  displayMessages();
  localStorage.setItem('todo', JSON.stringify(toDoList));
});

function displayMessages() {
  let displayMessage = '';
  toDoList.forEach(function (item, index) {
    displayMessage += `
            <li>
            <input type='checkbox' id='item_${index}' ${item.checked ? 'checked' : ''} />
            <label class="${item.important ? 'important' : ''}" for="item_${index}">${
      item.todo
    }</label>
            </li>
      `;
    todo.innerHTML = displayMessage;
  });
}

todo.addEventListener('change', function (e) {
  let idInput = e.target.getAttribute('id');
  let valueLabel = todo.querySelector('[for=' + idInput + ']').innerHTML;
  toDoList.forEach(function (item) {
    if (item.todo === valueLabel) {
      item.checked = !item.checked;
      localStorage.setItem('todo', JSON.stringify(toDoList));
    }
  });
});

todo.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  toDoList.forEach(function (item, index) {
    if (item.todo === e.target.innerHTML) {
      if (e.ctrlKey || e.metaKey) {
        toDoList.splice(index, 1);
      } else {
        item.important = !item.important;
      }
      displayMessages();
      localStorage.setItem('todo', JSON.stringify(toDoList));
    }
  });
});
