{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
       tasks = [
        ...tasks.slice(0,taskIndex),
        ...tasks.slice(taskIndex+1),
       ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0,taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex+1),
        ];
        render();
    };

    const allDone = () => {
        tasks = tasks.map((task)=>({
            ...task,
            done: true,
        }));
        render();
    };

    const hideDone = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });


        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="tasks__listItem">
            <button class="task__button task__button--done js-done">
              ${task.done ? "✓" : " "}
            </button>
            <span class="tasks__content ${task.done ? "tasks__content--done" : ""}">
               ${task.content}  
            </span>
            <button class="task__button task__button--remove js-remove">\uD83D\uDDD1\uFE0F
            </button>
         </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;


    };

    const renderButtons = () => {
        let htmlString = "";
        if (tasks.length) {
            htmlString = `
        <button class="section__button  js-hideDoneButton">${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}</button>
        <button class="section__button  js-allDoneButton">${tasks.every(({ done }) => done) ? disabled : ""}Ukończ wszystkie</button>
        `;

        }
        document.querySelector(".js-headerButtons").innerHTML = htmlString;
    };

    const bindButtonsEvents = () => {

    };


    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonsEvents();

    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskInput = document.querySelector(".js-newTask");
        const newTaskContent = newTaskInput.value.trim();
        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskInput.value = "";
        }

        newTaskInput.focus();

    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();

};