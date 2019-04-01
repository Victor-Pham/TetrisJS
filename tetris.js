var tetris = {};

//Draw the grid
tetris.drawPlayField = function(){
	for(var row=0;row<20;row++){
		$('#playfield').append('<tr class="'+row+'"></tr>');
		for (var col=0;col<10;col++){
			$('.'+row).append('<td id="'+col+'"></td>');
		}
	}
}



//Variable to store current coordiates
tetris.currentCoor = [{row:1,col:1},
    {row:1,col:2},
    {row:2,col:1},
    {row:2,col:2}];


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
    for(var i = 0; i < this.currentCoor.length; i++){
        if(direction == 'right'){
            this.currentCoor[i].col++;
        }
        else if (direction == 'left'){
            this.currentCoor[i].col--;
        }
    }

    this.fillCells(this.currentCoor, 'yellow');
}


$(document).ready(function(){
    tetris.drawPlayField();
    tetris.fillCells(tetris.currentCoor,'yellow');
    
    $(document).keydown(function(e){
        console.log(e.keyCode);
        
        if(e.keyCode === 39){
            tetris.move('right');
        }
        else if (e.keyCode === 37){
            tetris.move('left');
        }
    })
}) 