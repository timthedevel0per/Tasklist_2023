let tasks = [];

try {
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
} catch (error) {
  console.error(error);
  tasks = [];
}


  
window.addEventListener('load', () => {
    
    console.log(tasks);
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");
    const clear_tasks_el = document.querySelector("#clear_tasks");

    tasks.forEach(task => {
      const task_el = createTaskElement(task);
      console.log(document.querySelector('#tasks'))
      list_el.appendChild(task_el);
    });
  
    clear_tasks_el.addEventListener('click', (event) => {
      document.querySelector('#tasks').innerHTML = '';
      window.localStorage.removeItem('tasks');
    });
  
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = input.value;
        const task_el = createTaskElement(task, list_el, tasks.length);
        tasks.push(task);
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
        input.value = '';
        list_el.appendChild(task_el);
        return task_el;
      });
    });
  
  const createTaskElement = (task, list_el, index) => {
    const task_el = document.createElement('div');
    task_el.classList.add('task'); 
  console.log(task)
    const task_content_el = document.createElement('div');
    task_content_el.classList.add('content');
  
    task_el.appendChild(task_content_el);

    task_el.setAttribute('data-index', index);
  
  
    const task_input_el = document.createElement('input');
    task_input_el.classList.add('text');
    task_input_el.type = 'text';
    task_input_el.value = task;
    task_input_el.setAttribute('readonly', 'readonly');
  
    task_content_el.appendChild(task_input_el);
  
    const task_actions_el = document.createElement('div');
    task_actions_el.classList.add('actions');
    
    const task_edit_el = document.createElement('button');
    task_edit_el.classList.add('edit');
    task_edit_el.innerText = 'Edit';
  
    const task_delete_el = document.createElement('button');
    task_delete_el.classList.add('delete');
    task_delete_el.innerText = 'Delete';
  
    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);
  
    task_el.appendChild(task_actions_el);
  
    window.localStorage.setItem('tasks', JSON.stringify(tasks));   
  
    task_edit_el.addEventListener('click', (e) => {
      if (task_edit_el.innerText.toLowerCase() == "edit") {
        task_edit_el.innerText = "Save";
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
      } else {
        task_edit_el.innerText = "Edit";
        task_input_el.setAttribute("readonly", "readonly");

        const task_Index = tasks.indexOf(task)

        tasks[task_Index] = task_input_el.value;


        window.localStorage.setItem('tasks', JSON.stringify(tasks));

      }
    });
  
    task_delete_el.addEventListener('click', (e) => {
        const task_Index = task_el.getAttribute('data-index');
        task_el.parentNode.removeChild(task_el);
        tasks.splice(task_Index, 1);
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
    
      
        
    
    
    list_el.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
    const task_el = e.target.parentElement.parentElement;
    const task_index = task_el.getAttribute('data-index');
    tasks.splice(task_index, 1);
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
    task_el.remove();
  }
});
    
  });

  return task_el;
}