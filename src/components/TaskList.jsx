import { useState } from "react";

export const TaskList = ({
    tasks,
    onRemove,
    moveTaskToDone,
    setDoneTask,
    openEditModal,
    setInProgress,
    done = false
}) => {

    /* 
    FALSE = SHOW DONE
    TRUE = SHOW IN PROGRESS
    */

    return (
        <section className=" w-full h-full">
            <div className="grid mx-5 overflow-y-auto h-full items-start content-start">
                {tasks.map((t, id) =>
                    <div className="flex justify-between bg-[#f0f4f8] mt-4 py-4 px-6 rounded-xl">
                        <div className="flex">
                            <input
                                type="checkbox"
                                className="text-purple-500 mr-5 cursor-pointer"
                                disabled={!done}
                                checked={!done}
                                onChange={() => moveTaskToDone(t, id)} />
                            <p
                                key={id}
                                className={`text-sm opacity-90 sm:text-base font font-semibold ${!done ? "line-through text-red-400" : ""}`}
                            >
                                {t}
                            </p>
                        </div>


                        <div className="flex gap-4">
                            <button
                                className={`text-gray-500 hover:text-green-500 edit-btn px-4 cursor-pointer ${done ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                                onClick={() => openEditModal(t, id)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                </svg>
                            </button>
                            <button
                                className="text-gray-500 hover:text-red-500 cursor-pointer"
                                onClick={() => onRemove(id, tasks, !done ? setDoneTask : setInProgress)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};