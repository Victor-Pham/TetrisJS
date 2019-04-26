
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
tetris.origin = {row:5, col:5};
tetris.currentShape = 'T';
tetris.currentCoor;
tetris.color = "orange";

tetris.shapeToCoor = function(shape, origin){
    if(shape === 'L'){
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row+1,col:origin.col},{row:origin.row+1,col:origin.col+1}]
	} else if(shape === 'J'){ 
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row+1,col:origin.col},{row:origin.row+1,col:origin.col-1}]
	} else if(shape === 'I'){
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row-2,col:origin.col},{row:origin.row+1,col:origin.col}]
	} else if(shape === 'O'){
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row-1,col:origin.col+1},{row:origin.row,col:origin.col+1}]
	} else if(shape === 'S'){
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row,col:origin.col-1},{row:origin.row-1,col:origin.col+1}]
	} else if(shape === 'T'){
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row,col:origin.col-1},{row:origin.row,col:origin.col+1}]
	} else if(shape === 'Z'){
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row-1,col:origin.col-1},{row:origin.row,col:origin.col+1}]
	} else if(shape === 'L90'){
  	return [{row:origin.row,col:origin.col},{row:origin.row,col:origin.col+1},{row:origin.row,col:origin.col-1},{row:origin.row+1,col:origin.col-1}];
  } else if(shape === 'L180'){
  	return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row+1,col:origin.col},{row:origin.row-1,col:origin.col-1}];
  } else if(shape === 'L270'){
  	return [{row:origin.row,col:origin.col},{row:origin.row,col:origin.col+1},{row:origin.row,col:origin.col-1},{row:origin.row-1,col:origin.col+1}];
  } else if(shape === 'J90'){ 
		return [{row:origin.row,col:origin.col},{row:origin.row,col:origin.col-1},{row:origin.row,col:origin.col+1},{row:origin.row-1,col:origin.col-1}]
	} else if(shape === 'J180'){ 
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row+1,col:origin.col},{row:origin.row-1,col:origin.col+1}]
	} else if(shape === 'J270'){ 
		return [{row:origin.row,col:origin.col},{row:origin.row,col:origin.col-1},{row:origin.row,col:origin.col+1},{row:origin.row+1,col:origin.col+1}]
	} else if(shape === 'I90'){
		return [{row:origin.row,col:origin.col},{row:origin.row,col:origin.col-1},{row:origin.row,col:origin.col+1},{row:origin.row,col:origin.col+2}]
	} else if(shape === 'S90'){
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row-1,col:origin.col-1},{row:origin.row-2,col:origin.col-1}]
	} else if(shape === 'Z90'){
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row-1,col:origin.col+1},{row:origin.row-2,col:origin.col+1}]
	} else if(shape === 'T90'){
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row+1,col:origin.col},{row:origin.row,col:origin.col+1}]
	} else if(shape === 'T180'){
		return [{row:origin.row,col:origin.col},{row:origin.row+1,col:origin.col},{row:origin.row,col:origin.col-1},{row:origin.row,col:origin.col+1}]
	} else if(shape === 'T270'){
		return [{row:origin.row,col:origin.col},{row:origin.row-1,col:origin.col},{row:origin.row+1,col:origin.col},{row:origin.row,col:origin.col-1}]
	} 

    
}

tetris.rotate = function(){
    var lastShape = this.currentShape;
    this.fillCells(this.currentCoor, '');
    if(this.currentShape === 'L'){
		this.currentShape = 'L90';
	} else if(this.currentShape === 'L90'){
		this.currentShape = 'L180';
	} else if(this.currentShape === 'L180'){
		this.currentShape = 'L270';
	} else if(this.currentShape === 'L270'){
		this.currentShape = 'L';
	} else if(this.currentShape === 'J'){
		this.currentShape = 'J90';
	} else if(this.currentShape === 'J90'){
		this.currentShape = 'J180';
	} else if(this.currentShape === 'J180'){
		this.currentShape = 'J270';
	} else if(this.currentShape === 'J270'){
		this.currentShape = 'J';
	} else if(this.currentShape === 'I'){
		this.currentShape = 'I90';
	} else if(this.currentShape === 'I90'){
		this.currentShape = 'I';
	} else if(this.currentShape === 'S'){
		this.currentShape = 'S90';
	} else if(this.currentShape === 'S90'){
		this.currentShape = 'S';
	} else if(this.currentShape === 'Z'){
		this.currentShape = 'Z90';
	} else if(this.currentShape === 'Z90'){
		this.currentShape = 'Z';
	} else if(this.currentShape === 'T'){
		this.currentShape = 'T90';
	} else if(this.currentShape === 'T90'){
		this.currentShape = 'T180';
	} else if(this.currentShape === 'T180'){
		this.currentShape = 'T270';
	} else if(this.currentShape === 'T270'){
		this.currentShape = 'T';
	}


    for(var i = 0; i < this.currentCoor.length; i++){
        if(this.ifReverse()){
            this.currentShape = lastShape;
        }
    }
    
    this.currentCoor = this.shapeToCoor(this.currentShape, this.origin);
    this.fillCells(this.currentCoor, this.color);


}


//Fill the cells
tetris.fillCells = function(coordinates,fillColor){

    for(var i=0;i<coordinates.length;i++){
        var row = coordinates[i].row;
        var col = coordinates[i].col;
        var $coor = $('.'+row).find('#'+col);
        $coor.attr('bgcolor',fillColor);
        if(fillColor != ''){
            $coor.attr('background', 'block4.png');
        }
        else{
            $coor.attr('background', '');
            $coor.attr('abbr', '');            
        }

    }
}

tetris.spawn = function(){
    this.origin = {row:3, col:5};
    var random = Math.floor(Math.random()*7);
    var colorArray = ['#0102F0','#F09F02','#01F0F1','#F0F001','#00FF01', 'F00100','A001EF'];
    this.color = colorArray[random];
    var shapeArray = ['J', 'L', 'I', 'O', 'S','Z', 'T'];
    this.currentShape = shapeArray[random];
    this.currentCoor = this.shapeToCoor(this.currentShape, this.origin);
}

tetris.ifReverse = function(){
    for(var i =0; i < this.currentCoor.length; i++){
        var row = this.currentCoor[i].row;
        var col = this.currentCoor[i].col;
        var $coor = $('.'+row).find('#'+col);


        if($coor.length == 0 || $coor.attr('background') == 'block4.png'){
            return true;
        }
    }

    return false;
}

tetris.clearLine = function(){
    var drops = 0;
    console.log('clearline');
    for(var row = 19; row >= 0; row--){
        var rowIsFull = true;

        for(var col = 0; col < 10; col++){
            var $coor = $('.'+row).find('#'+col);
            if($coor.attr('abbr') != 'block'){
                rowIsFull = false;

            }

            
            if(drops > 0){
                var $newCoor = $('.'+(row+drops)).find('#'+col);
                $newCoor.attr('bgcolor', $coor.attr('bgcolor'));
                if($newCoor.attr('bgcolor') == ''){
                    $newCoor.attr('background', '');
                    $newCoor.attr('abbr', '');
                }
                
            }
        }

        if(rowIsFull){
            drops++;
        }


    }
}
//Move shape
tetris.move = function(direction){
    this.fillCells(this.currentCoor, '');
    
    //move origin
    if(direction === 'right'){
        this.origin.col++;
    }
    else if(direction === 'left'){
        this.origin.col--;
    }

    this.currentCoor = this.shapeToCoor(this.currentShape, this.origin);

    if(this.ifReverse()){
        if(direction === 'right'){
            this.origin.col--;
        }
        else if(direction === 'left'){
            this.origin.col++;
        }
    }

    this.currentCoor = this.shapeToCoor(this.currentShape, this.origin);

    this.fillCells(this.currentCoor, this.color);
}

tetris.drop = function(){
    var reverse = false;
    this.fillCells(this.currentCoor, '');



    this.origin.row++;

    for(var i = 0; i < this.currentCoor.length; i++){
        this.currentCoor[i].row++;

            if(this.ifReverse()){
                reverse = true;
            }
    }

    if(reverse){
        for(var i = 0; i < this.currentCoor.length; i++){
            this.currentCoor[i].row--;

        }

        this.origin.row--;

    }

    this.fillCells(this.currentCoor, this.color);

    if(reverse){
        for(var i =0; i < this.currentCoor.length; i++){
            var row = this.currentCoor[i].row;
            var col = this.currentCoor[i].col;
            var $coor = $('.'+row).find('#'+col);
            $coor.attr('abbr', 'block');
        }

        this.clearLine();
        this.spawn();
    }
}

var gravity = setInterval(function(){tetris.drop();}, 375);


$(document).ready(function(){
    tetris.drawPlayField();
    tetris.currentCoor = tetris.shapeToCoor(tetris.currentShape, tetris.origin);
    tetris.spawn();    
    $(document).keydown(function(e){
        console.log(e.keyCode);
        
        if(e.keyCode === 39){
            tetris.move('right');
        }
        else if (e.keyCode === 37){
            tetris.move('left');
        }
        else if (e.keyCode === 40){
            tetris.drop();
        }
        else if(e.keyCode === 38){
            tetris.rotate();
        }
        else if(e.keyCode === 32){
            tetris.spawn();
        }
    })
}) 