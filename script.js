document.addEventListener("DOMContentLoaded", () => {
    const drawBoard = document.querySelector(".draw-board");
    const randomButton = document.getElementById("randomize");
    const eraserButton = document.getElementById("eraser");
    const gridSize = document.getElementById("grid-size");
    const gridSizeLabel = document.getElementById("grid-size-label");

    defaultPenColor = "#000000";
    defaultBgColor = "#ffffff";
    defaultGridSize = 16;

    let pen = defaultPenColor;
    let bgColor = defaultBgColor;
    let isRandomActive = false;
    let isEraserActive = false;

    createGrid(defaultGridSize);

    function createGrid (size) {
        drawBoard.innerHTML = "";
        const sqaureSize = 580 / size;

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const square = document.createElement("div");
                square.classList.add("grid-square");
                square.style.width = `${sqaureSize}px`;
                square.style.height = `${sqaureSize}px`;
                drawBoard.appendChild(square);
            }
        }
        draw()
    }
    function draw() {
        const squares = document.querySelectorAll(".grid-square");
        squares.forEach(square => {
            square.addEventListener("click", () => {
                if (isEraserActive) {
                    square.style.backgroundColor = bgColor;
                } else if (isRandomActive) {
                    square.style.backgroundColor = getRandomColor();
                } else {
                    square.style.backgroundColor = pen;
                }
            })
        })
    }
    function getRandomColor() {
        letters = "0123456789ABCDEF";
        color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    document.getElementById("colorInput").addEventListener("input", (event) => {
        pen = event.target.value;
        isRandomActive = false;
        isEraserActive = false;
    })
    document.getElementById("bgInput").addEventListener("input", (event) => {
        bgColor = event.target.value;
        const squares = document.querySelectorAll(".grid-square");
        squares.forEach(square => {
            square.style.backgroundColor = bgColor;
        })
    })
    document.getElementById("randomize").addEventListener("click", () => {
        isRandomActive = !isRandomActive;
        isEraserActive = false;
        randomButton.classList.toggle("active", isRandomActive);
        eraserButton.classList.remove("active");
    })
    document.getElementById("eraser").addEventListener("click", () => {
        isEraserActive = !isEraserActive;
        isRandomActive = false;
        eraserButton.classList.toggle("active", isEraserActive);
        randomButton.classList.remove("active");
    })
    gridSize.addEventListener("input", (event) => {
        const grid = event.target.value;
        gridSizeLabel.textContent = `${grid} x ${grid}`;
        createGrid(grid);
    })
    document.getElementById("reset").addEventListener("click", () => {
        drawBoard.innerHTML = "";
        pen = defaultPenColor;
        bgColor = defaultBgColor;
        isRandomActive = false;
        isEraserActive = false;
        colorInput.value = defaultPenColor;
        bgInput.value = defaultBgColor;
        gridSize.value = defaultGridSize;
        gridSizeLabel.textContent = `${defaultGridSize} x ${defaultGridSize}`;
        createGrid(defaultGridSize);
    })
})