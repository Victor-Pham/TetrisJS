var tetris = {};

//Draw the grid
tetris.drawPlayField = function(){
	for(var row=0;row<22;row++){
		$('#playfield').append('<tr class="'+row+'"></tr>');
		for (var col=0;col<10;col++){
			$('.'+row).append('<td id="'+col+'"></td>');
		}
	}
}



//Variable to store current coordiates
tetris.origin = {row:5, col:5};
tetris.currentShape = 'L';
tetris.currentCoor;

tetris.shapeToCoor = function(shape, origin){
    if(shape === 'L'){
        return [{row: origin.row, col:origin.col},
                {row:origin.row - 1, col:origin.col},
                {row:origin.row + 1, col:origin.col},
                {row:origin.row + 1, col:origin.col + 1}];
    }
    else if (shape === 'L90'){
        return [{row:origin.row, col:origin.col},
                {row:origin.row, col:origin.col + 1},
                {row:origin.row, col:origin.col - 1},
                {row:origin.row + 1, col:origin.col - 1}];
    }
    
}

tetris.rotate = function(){
    this.fillCells(this.currentCoor, '');
    if(this.currentShape === 'L'){
        this.currentShape = 'L90';
    }
    else if (this.currentShape === 'L90'){
        this.currentShape = 'L';
    }
    
    this.currentCoor = this.shapeToCoor(this.currentShape, this.origin);
    this.fillCells(this.currentCoor, 'orange');
}


//Fill the cells
tetris.fillCells = function(coordinates,fillColor){

    for(var i=0;i<coordinates.length;i++){
        var row = coordinates[i].row;
        var col = coordinates[i].col;
        var $coor = $('.'+row).find('#'+col);
        $coor.attr('bgcolor',fillColor);
    }
}

//Move shape
tetris.move = function(direction){
    this.fillCells(this.currentCoor, '');

    var reverse;
    for(var i = 0; i < this.currentCoor.length; i++){
        if(direction == 'right'){
            this.currentCoor[i].col++;
            if(this.currentCoor[i].col > 9){
                reverse = true;
            }
        }
        else if (direction == 'left'){
            this.currentCoor[i].col--;
            if(this.currentCoor[i].col < 0){
                reverse= true;
            }
        }
        else if (direction == 'down'){
            this.currentCoor[i].row++;
            if(this.currentCoor[i].row > 21){
                this.currentCoor[i].row = 0;
            }
        }
        else if(direction =='up'){
            this.currentCoor[i].row--;
        }

    }

    //move origin
    if(direction === 'right'){
        this.origin.col++;
    }
    else if (direction === 'left'){
        this.origin.col--;
    }

    this.fillCells(this.currentCoor, 'orange');

    if(reverse && direction === 'left'){
        this.move('right');
    }
    else if (reverse && direction === 'right'){
        this.move('left');
    }


}

var gravity = setInterval(function(){tetris.move('down')}, 375);


$(document).ready(function(){
    tetris.drawPlayField();
    tetris.currentCoor = tetris.shapeToCoor(tetris.currentShape, tetris.origin);
    tetris.fillCells(tetris.currentCoor,'orange');
    
    $(document).keydown(function(e){
        console.log(e.keyCode);
        
        if(e.keyCode === 39){
            tetris.move('right');
        }
        else if (e.keyCode === 37){
            tetris.move('left');
        }
        else if (e.keyCode === 40){
            tetris.move('down');
        }
        else if(e.keyCode === 38){
            tetris.rotate();
        }
    })
}) 