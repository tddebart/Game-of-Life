// noinspection DuplicatedCode

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
let resolution = 5;
let start = false;
let water = false;
const neighBoursInd = [[-1,-1], [-1,0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1,1]]

function setup() {
    createCanvas(800, 800);
    cols = width/ resolution;
    rows = height/ resolution;
    frameRate(10000)
    grid = made2DArray(cols,rows)
    document.addEventListener('contextmenu', event => event.preventDefault());
    textSize(15);
    textAlign(LEFT,TOP);
    document.getElementById('resolution').textContent = width/resolution + " | " + height/resolution + " | " + (width/resolution)*(height/resolution)
}

function next() {
    let next = made2DArray(cols,rows);
    for (x = 0; x < cols; x++) {
        for (y = 0; y < rows; y++) {
            //next[i][j] = grid[i][j]
            if(grid[x][y] === 1) {
                if(!water) {
                    let left = isEmpty(x-1,y+1)
                    let right = isEmpty(x+1,y+1)
                    if(left && right) {
                        const rand = random(1.1) > 0.5
                        left  = rand;
                        right = !rand;
                    }
                    if(isEmpty(x,y+1)) {
                        next[x][y] = 0;
                        next[x][y+1] = 1
                    } else if(left) {
                        next[x][y] = 0;
                        next[x-1][y+1] = 1
                    } else if (right) {
                        next[x][y] = 0;
                        next[x+1][y+1] = 1
                    }  else {
                        next[x][y] = 1;
                    }
                } else {
                    let left = isEmpty(x-1,y)
                    let right = isEmpty(x+1,y)
                    if(left && right) {
                        const rand = random(1.1) > 0.5
                        left  = rand;
                        right = !rand;
                    }
                    if(isEmpty(x,y+1)) {
                        next[x][y] = 0;
                        next[x][y+1] = 1
                    } else if(left) {
                        next[x][y] = 0;
                        next[x-1][y] = 1
                    } else if (right) {
                        next[x][y] = 0;
                        next[x+1][y] = 1
                    }  else {
                        next[x][y] = 1;
                    }
                }
                // if(water) {
                //     if(isValidCoord(x+1,y) && grid[x+1][y] === 0) {
                //         next[x][y] = 0;
                //         next[x+1][y] = 1
                //     } else if(isValidCoord(x-1,y) && grid[x-1][y] === 0) {
                //         next[x][y] = 0;
                //         next[x-1][y] = 1
                //     }
                // }
            }
        }
    }
    grid = next;
}

function isEmpty(x,y) {
    return isValidCoord(x, y) && grid[x][y] === 0;

}

function isValidCoord(x,y) {
    return !(x < 0 || y < 0 || x > cols-1 || y > rows-1);
}

function draw() {
    if(mouseIsPressed) {
        if(grid.length >= floor(mouseX/resolution) && grid[floor(mouseX/resolution)] !== undefined && grid[floor(mouseX/resolution)].length >= floor(mouseY/resolution)) {
            if(mouseButton === LEFT) {
                for (i = 1; i < 5; i++) {
                    for (h = 0; h < neighBoursInd.length; h++) {
                        const ind = neighBoursInd[h]
                        grid[floor(mouseX / resolution) + ind[0]*i][floor(mouseY / resolution) + ind[1]*i] = 1
                    }
                }
            } else if (mouseButton === RIGHT) {
                grid[floor(mouseX/resolution)][floor(mouseY/resolution)] = 0
            }
        }
    }
    background(255)
    stroke(255)
    for (i = 0; i < cols; i++) {
        for (j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if(grid[i][j] === 1) {
                fill(0)
                stroke(255)
                rect(x,y,resolution, resolution)
            }
        }
    }
    text(floor(getFrameRate()), 10, 10);
    next()
}