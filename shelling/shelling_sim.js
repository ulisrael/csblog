var shelling_sim = function(s) {

    var w;
    var columns;
    var rows;
    var board;
    var next;
    var population = [];

    s.setup = function() {

        var canvasWidth = 400;
        var canvasHeight = 400;

        var canvasDiv = s.select('#canvasDiv-shelling')
        var sketchDiv = s.select('#sketch-holder-shelling')
        //sketchDiv.style('position: relative')
        canvas = s.createCanvas(canvasWidth, canvasHeight);
        //canvas = createCanvas(360, 360);
        canvas.parent(canvasDiv);
        //sketchDiv.style('width: ${canvasWidth}')

        w = 10;
        // Calculate columns and rows
        columns = s.floor(s.width / w);
        rows = s.floor(s.height / w);
        // // Wacky way to make a 2D array is JS
        // board = new Array(columns);
        // for (var i = 0; i < columns; i++) {
        //     board[i] = new Array(rows);
        // }

        s.init();
    }

    s.draw = function() {
        //s.blank_grid()
        for (var i = 0; i < population.length; i++) {
            population[i].render()
        }
    }

    // reset board when mouse is pressed
    s.mousePressed = function() {
        s.init();
    }

    // Fill board randomly
    s.init = function() {
        var population = [];
        for (var i = 0; i < columns; i++) {
            for (var j = 0; j < rows; j++) {
                // Filling randomly with turtles
                if (s.random(1) < 0.5) {
                    var t = new s.Turtle(i, j);
                    //t.render()
                    population.push(t)
                }
            }
        }

        s.blank_grid()

        for (var i = 0; i < population.length; i++) {
            population[i].render()
        }
    }

    s.blank_grid = function() {
        s.background(255);
        s.fill(255);
        for (var i = 0; i < columns; i++) {
            for (var j = 0; j < rows; j++) {
                s.stroke(0);
                s.rect(i * w, j * w, w - 1, w - 1);
            }
        }
    }

    s.Turtle = function(row, col) {
        this.happy = true
        this.row = row;
        this.col = col;
        this.type = s.ceil(s.random(2))

        this.render = function() {
            if ((this.type == 1)) {
                s.fill(2, 71, 148)
            };
            if ((this.type == 2)) {
                s.fill(255, 199, 44)
            };
            s.stroke(0);
            s.push();
            s.rect(this.row * w, this.col * w, w - 1, w - 1);
            s.pop();
        }
    }

    // // The process of creating the new generation
    // s.generate = function() {
    //
    //     // Loop through every spot in our 2D array and check spots neighbors
    //     for (var x = 1; x < columns - 1; x++) {
    //         for (var y = 1; y < rows - 1; y++) {
    //             // Add up all the states in a 3x3 surrounding grid
    //             var neighbors = 0;
    //             for (var i = -1; i <= 1; i++) {
    //                 for (var j = -1; j <= 1; j++) {
    //                     neighbors += board[x + i][y + j];
    //                 }
    //             }
    //
    //             // A little trick to subtract the current cell's state since
    //             // we added it in the above loop
    //             neighbors -= board[x][y];
    //             // Rules of Life
    //             if ((board[x][y] == 1) && (neighbors < 2)) next[x][y] = 0; // Loneliness
    //             else if ((board[x][y] == 1) && (neighbors > 3)) next[x][y] = 0; // Overpopulation
    //             else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1; // Reproduction
    //             else next[x][y] = board[x][y]; // Stasis
    //         }
    //     }
    //
    //     // Swap!
    //     var temp = board;
    //     board = next;
    //     next = temp;
    // }

}

var myp5 = new p5(shelling_sim);