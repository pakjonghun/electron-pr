const { ipcRenderer } = require('electron');

ipcRenderer.on('todo:render', (e, todo) => {
  console.log('web', todo);
  const ul = document.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = todo;
  ul.prepend(li);
});

ipcRenderer.on('todo:clear', () => {
  const ul = document.querySelector('ul');
  ul.innerHTML = '';
});
