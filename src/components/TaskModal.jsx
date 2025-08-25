export const TaskModal = ({ open, onClose, children, onEdit, inputValue, setInputValue, mode = "add" }) => {

    const isEdit = mode === "edit";

    function handleSubmit() {
        if (!inputValue || inputValue.trim() === "") {
            alert("Input cannot be empty");
            return;
        }

        onEdit(inputValue);
        setInputValue("");
        onClose();
    }

    function handleCancel() {
        setInputValue("");
        onClose();
    }

    if (!open) return null;

    return (
        <div className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}>
            <div className={`bg-white rounded-xl shadow p-6 transition-all ${open ? "opacity-100" : "opacity-0"}`}>
                <h2 className="text-xl font-semibold mb-4">
                    {isEdit ? "Edit Task" : "Add Task"}
                </h2>
                {/* TO DO: add the logic for adding elements in modal */}
                <div className="w-52 h-25">
                    <input
                        type="text"
                        placeholder={isEdit ? "Edit Task" : "Add Task"}
                        className="w-full px-4 py-2 border rounded border-gray-400"
                        id="getInput"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />

                    <div className="flex mt-10 justify-between px-4">
                        <button
                            className="border border-gray-400 rounded px-2 py-1 cursor-pointer hover:bg-gray-100"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="border border-gray-400 rounded px-2 py-1 cursor-pointer hover:bg-gray-100"
                            onClick={handleSubmit}
                        >
                            {isEdit ? "Save" : "Add"}
                        </button>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
}