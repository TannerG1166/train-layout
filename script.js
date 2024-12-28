document.addEventListener("DOMContentLoaded", () => {
    const addEngineBtn = document.getElementById("add-engine-btn");
    const engineList = document.getElementById("engine-list");
    const engineDragArea = document.getElementById("engine-drag-area");

    let engines = [];  // Array to hold engine data

    // Function to create a new engine
    function addEngine(name) {
        const engine = {
            name: name || `Engine ${engines.length + 1}`,
            x: 0,
            y: 0,
        };
        engines.push(engine);

        // Create engine div
        const engineDiv = document.createElement("div");
        engineDiv.classList.add("engine");
        engineDiv.id = `engine-${engines.length - 1}`;
        engineDiv.textContent = engine.name;

        // Set position of the engine (draggable)
        engineDiv.style.left = `${engine.x}px`;
        engineDiv.style.top = `${engine.y}px`;

        // Enable drag functionality
        engineDiv.draggable = true;
        engineDiv.addEventListener("dragstart", dragStart);
        engineDiv.addEventListener("dragend", dragEnd);

        // Add to the layout
        engineDragArea.appendChild(engineDiv);

        // Update engine list in the sidebar
        const engineListItem = document.createElement("div");
        engineListItem.textContent = engine.name;
        engineList.appendChild(engineListItem);
    }

    // Function to handle the drag start
    function dragStart(event) {
        event.dataTransfer.setData("text", event.target.id);
    }

    // Function to handle the drag end
    function dragEnd(event) {
        const id = event.target.id;
        const engineIndex = parseInt(id.replace("engine-", ""));
        const engine = engines[engineIndex];

        // Get the new position of the engine
        const layoutRect = document.getElementById("train-layout-image").getBoundingClientRect();
        engine.x = event.pageX - layoutRect.left - event.target.offsetWidth / 2;
        engine.y = event.pageY - layoutRect.top - event.target.offsetHeight / 2;

        // Update the engine's position on the screen
        event.target.style.left = `${engine.x}px`;
        event.target.style.top = `${engine.y}px`;
    }

    // Event listener for the "Add Engine" button
    addEngineBtn.addEventListener("click", () => {
        addEngine();
    });

    // Initial setup: add a few engines
    addEngine("Diesel 1");
    addEngine("Steam 3");
});
