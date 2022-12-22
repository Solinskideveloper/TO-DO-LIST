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
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleAllTaskDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const hideShowDoneTask = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };


    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");


        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };




    const renderTasks = () => {
        let listOfTaskHTMLContent = "";

        for (const task of tasks) {
            listOfTaskHTMLContent += `
            <li 
            class="tasks__item ${task.done && hideDoneTasks ? "tasks__item--hidden" : ""} js-task"
            >
            <button 
            class="task__button task__button--done js-done">
              ${task.done ? "✓" : " "}
            </button>
            <span class="tasks__content ${task.done ? "tasks__content--done" : ""}">
               ${task.content}  
            </span>
            <button class="task__button task__button--remove js-remove"> 🗑
            </button>
         </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = listOfTaskHTMLContent;


    };

    const renderButtons = () => {
        let buttonsHTMLContent = "";

        if (tasks.length !== 0) {
            buttonsHTMLContent = `
        <button 
        class="section__button  js-hideShowDoneTask"
            ${tasks.some(({ done }) => done) ? "" : "disabled"}>
            ${hideDoneTasks === true ? "Pokaż ukończone" : "Ukryj ukończone"}
        </button>
        <button 
        class="section__button  js-toggleAllDoneTask"
             ${tasks.every(({ done }) => done) ? "disabled" : ""}>
        Ukończ wszystkie
        </button>
        `;

        }
        document.querySelector(".js-buttons").innerHTML = buttonsHTMLContent;
    };

    const bindButtonsEvents = () => {
        const hideShowDoneTaskButton = document.querySelector(".js-hideShowDoneTask");
        const toggleAllTaskDoneButton = document.querySelector(".js-toggleAllDoneTask");

        if (hideShowDoneTaskButton) {
            hideShowDoneTaskButton.addEventListener("click",
                hideShowDoneTask);
        }

        if (toggleAllTaskDoneButton) {
            toggleAllTaskDoneButton.addEventListener("click",
                toggleAllTaskDone);
        };
    };




    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveEvents()
        bindToggleDoneEvents();
        bindButtonsEvents();

    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();

    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();

}
