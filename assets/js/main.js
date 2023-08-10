const todoForm = qs('#todoForm');
const newTodo = qs('.new-todo');
const todoList = qs('.todo-list');

todoForm.addEventListener('submit',addTodo);
function addTodo(event) {
    event.preventDefault(); //Olayı yakala ve ön tanımlı olayı yapmayı bırak (Bu durumda formu göndermek için sayfayı yenilemesi)
    todoList.innerHTML+=`<li>
        <div class="view">
            <div class="checkAndValue">
                <input class="toggle" type="checkbox">
                <label>${newTodo.value}</label>
                <input class="edit" value="${newTodo.value}">
            </div>
            <button class="destroy">X</button>
        </div>
    </li>`
    newTodo.value='';
};

for (const filter of document.querySelectorAll('.filters input')) {
    filter.addEventListener('click', function() {
        todoList.dataset.filter = this.value;
    })
}

todoList.addEventListener('click', function(e) {
    //silme
    if (e.target.classList.contains('destroy')) {
        e.target.parentElement.parentElement.remove();
    };
    if (e.target.classList.contains('toggle')) {
        e.target.parentElement.parentElement.parentElement.classList.toggle('completed');
    };
});


function handleTodoDoubleClick(event) {
    if (event.target.tagName === 'LABEL') {
        const listItem = event.target.closest('li');
        listItem.classList.add('editing');
        const editInput = listItem.querySelector('.edit');
        editInput.value = event.target.textContent;
        editInput.focus();
    }
}

function handleTodoEditKeyup(event) {
    if (event.key === 'Enter') {
        const listItem = event.target.closest('li');
        const editInput = listItem.querySelector('.edit');
        const label = listItem.querySelector('label');
        label.textContent = editInput.value;
        listItem.classList.remove('editing');
    } else if (event.key === 'Escape') {
        const listItem = event.target.closest('li');
        listItem.classList.remove('editing');
    }
}

todoList.addEventListener('dblclick', handleTodoDoubleClick);
todoList.addEventListener('keyup', handleTodoEditKeyup);




function qs(e) {
    return document.querySelector(e);
};