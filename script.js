
function tick(context, grid, mirrorGrid, rows, cols, size) { 
    drawGrid(context, grid, rows, cols, size);
    var grids = updateGrid(mirrorGrid, grid, rows, cols);
    setTimeout(function () {
        requestAnimationFrame(() => tick(context, grids[0], grids[1], rows, cols));
    }, 1000 / 10);
}

function initGrid(rows, cols) { 
    var grid = Array(rows).fill(Array(cols).fill(0));
    return grid.map(r => r.map( x => Math.round(Math.random()) ))
}

function drawGrid(context, grid, rows, cols, size) {
    context.clearRect(0, 0, rows, cols);
    context.fillStyle = 'rgba(225,225,225,0.4)';
    for (var j = 0; j < rows; j++) { 
        for (var k = 0; k < cols; k++) {
            if (grid[j][k] === 1) {
                context.fillRect(j*size, k*size, size, size);
            }
        }
    }
}

function updateGrid(mirrorGrid, grid, rows, cols) { 
    for (var j = 1; j < rows - 1; j++) { //iterate through rows
        for (var k = 1; k < cols - 1; k++) { //iterate through columns
            var totalCells = 0;
            //add up the total values for the surrounding cells
            totalCells += grid[j - 1][k - 1]; //top left
            totalCells += grid[j - 1][k]; //top center
            totalCells += grid[j - 1][k + 1]; //top right

            totalCells += grid[j][k - 1]; //middle left
            totalCells += grid[j][k + 1]; //middle right

            totalCells += grid[j + 1][k - 1]; //bottom left
            totalCells += grid[j + 1][k]; //bottom center
            totalCells += grid[j + 1][k + 1]; //bottom right

            //apply the rules to each cell
            switch (totalCells) {
                case 2:
                    mirrorGrid[j][k] = grid[j][k];
                    break;
                case 3:
                    mirrorGrid[j][k] = 1;
                    break;
                default:
                    mirrorGrid[j][k] = 0;
            }
        }
    }
    return [mirrorGrid, grid];
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resize(context, canvas, grid, rows, cols, size) {
    function initialize() {
        window.addEventListener('resize', resizeCanvas, false);
        resizeCanvas();
    }
    function redraw() {
        context.strokeStyle = 'black';
        context.lineWidth = '5';
        context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
    }
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        redraw();
    }
    initialize();
}

function main() {
    var rows = 400;
    var cols = 400;
    var size = 30;
    var grid = initGrid(rows, cols, size)
    var mirrorGrid = initGrid(rows, cols, size)
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    resize(context, canvas, grid, rows, cols, size);
    tick(context, grid, mirrorGrid, rows, cols, size);
}

main();

