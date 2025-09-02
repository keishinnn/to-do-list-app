import { useEffect, useState } from "react";
import { TaskModal } from "./TaskModal";
import { TaskList } from "./TaskList";

export const ToDoList = () => {

    const [inProgress, setInProgress] = useState(() => {
        const saved = localStorage.getItem("inProgress");
        return saved ? JSON.parse(saved) : [];
    });

    const [doneTask, setDoneTask] = useState(() => {
        const saved = localStorage.getItem("doneTask");
        return saved ? JSON.parse(saved) : [];
    })

    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const [inputValue, setInputValue] = useState("");

    const [activeComponent, setActiveComponent] = useState('one');

    useEffect(() => {
        localStorage.setItem("inProgress", JSON.stringify(inProgress));
    }, [inProgress]);

    useEffect(() => {
        localStorage.setItem("doneTask", JSON.stringify(doneTask));
    }, [doneTask]);

    /* functions for opening add and edit modal */
    function openAddModal() {
        setInputValue("");
        setIsEditing(false);
        setTaskModalOpen(true);
    }

    function openEditModal(task, index) {
        setInputValue(task);
        setEditIndex(index);
        setIsEditing(true);
        setTaskModalOpen(true);
    }

    /* 
    
    REFACTORED CODES
    
    */
    function moveTaskToDone(newDoneTask, index) {
        setDoneTask([...doneTask, newDoneTask]);
        setInProgress(inProgress.filter((_, currentIndex) => currentIndex !== index));
    }

    function onEdit(task) {
        if (isEditing) {
            const updatedTasks = [...inProgress];
            updatedTasks[editIndex] = task;
            setInProgress(updatedTasks);
        } else {
            if (inProgress.includes(task)) {
                alert("Duplicate task!");
                return;
            }
            setInProgress([...inProgress, task]);
        }
    }

    function onRemove(index, list, setList) {
        setList(list.filter((_, i) => i !== index));
    }

    return (
        <div className="px-5 sm:px-0 min-h-screen w-full flex flex-col items-center justify-center bg-[#f0f4f8]">
            <div className="h-[600px] w-[300px] sm:w-[400px] md:w-[500px] bg-white rounded-2xl shadow-lg sm:px-10 relative pb-25 ">
                <div className="flex-grow  flex flex-col w-full h-full">

                    {/* just a div for holding the tite*/}
                    <div className="bg-purple-500 absolute flex w-full justify-center left-0 top-0 rounded-t-2xl py-5 shadow-lg">
                        <h1 className="text-center font-semibold text-2xl text-white font-semibold text-lg">To Do List App</h1>

                    </div>

                    {/* for navigation */}
                    <div className=" mt-25 py-2 ">
                        <div className="flex justify-center items-start">
                            <button
                                className={`nav
                                    ${activeComponent === 'one'
                                        ? "nav-in"
                                        : ""}`}
                                onClick={() =>
                                    setActiveComponent('one')
                                }
                            >
                                In Progress
                            </button>
                            <button
                                className={`nav
                                    ${activeComponent === 'two'
                                        ? "nav-in"
                                        : ""}`}
                                onClick={() => setActiveComponent('two')
                                }
                            >
                                Done
                            </button>
                        </div>
                    </div>

                    {/* section for showing the in progress and done panel */}
                    <div className="flex justify-center w-full h-90 ">
                        {activeComponent === 'one' &&
                            <TaskList
                                tasks={inProgress}
                                onRemove={onRemove}
                                done={true}
                                moveTaskToDone={moveTaskToDone}
                                openEditModal={openEditModal}
                                setInProgress={setInProgress}
                            />
                        }

                        {activeComponent === 'two' &&
                            <TaskList
                                tasks={doneTask}
                                onRemove={onRemove}
                                done={false}
                                setDoneTask={setDoneTask}
                            />
                        }
                    </div>
                </div>
                <TaskModal
                    open={taskModalOpen}
                    onClose={() => setTaskModalOpen(false)}
                    onEdit={onEdit}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    mode={isEditing ? "edit" : "add"}
                />

                {/* add button */}
                <div className="flex justify-center py-6 px-6">
                    <button
                        className="bg-purple-500 rounded outline py-1 px-3 text-end cursor-pointer flex items-center text-white py-2 px-6 rounded-full shadow-md hover:bg-purple-600 gap-2"
                        onClick={openAddModal}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg"
                            viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                        </svg>
                        <span className="font-medium">New Task</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
