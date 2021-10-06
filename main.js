

function made2DArray(cols, rows) {
    let arr = new Array(cols);
    for (i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    for (i = 0; i < cols; i++) {
        for (j = 0; j < rows; j++) {
            arr[i][j] = 0
        }
    }
    return arr;
}

let grid;
let cols;
let rows;
let resolution = 20;
let start = false;
const neighBoursInd = [[-1,-1], [-1,0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1,1]]

function setup() {
    createCanvas(800, 800);
    cols = width/ resolution;
    rows = height/ resolution;
    frameRate(10)

    grid = made2DArray(cols,rows)
    document.addEventListener('contextmenu', event => event.preventDefault());

    document.getElementById('resolution').textContent = width/resolution + " | " + height/resolution + " | " + (width/resolution)*(height/resolution)
}

function next() {
    let next = made2DArray(cols,rows);
    for (i = 0; i < cols; i++) {
        for (j = 0; j < rows; j++) {
            let liveNeighbours = 0;
            for (h = 0; h < neighBoursInd.length; h++) {
                const ind = neighBoursInd[h]
                if(isValidCoord(i+ind[0], j+ind[1])) {
                    if(grid[i+ind[0]][j+ind[1]] === 1) {
                        liveNeighbours++;
                    }
                }
            }
            if(grid[i][j] === 1 && liveNeighbours < 2 || liveNeighbours > 3) {
                next[i][j] = 0;
            } else if(grid[i][j] === 1){
                next[i][j] = 1;
            }
            if (grid[i][j] === 0 && liveNeighbours === 3) {
                next[i][j] = 1;
            }
        }
    }
    grid = next;
}

function isValidCoord(x,y) {
    return !(x < 0 || y < 0 || x > cols-1 || y > rows-1);
}

function draw() {
    if(mouseIsPressed) {
        if(grid.length >= floor(mouseX/resolution) && grid[floor(mouseX/resolution)] !== undefined && grid[floor(mouseX/resolution)].length >= floor(mouseY/resolution)) {
            if(mouseButton === LEFT) {
                grid[floor(mouseX/resolution)][floor(mouseY/resolution)] = 1
            } else if (mouseButton === RIGHT) {
                grid[floor(mouseX/resolution)][floor(mouseY/resolution)] = 0
            }
        }
    }
    background(0)
    for (i = 0; i < cols; i++) {
        for (j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if(grid[i][j] === 0) {
                fill(255)
                rect(x,y,resolution, resolution)
            }
        }
    }
    if(start) {
        //frameRate(5)
        next()
    }
}