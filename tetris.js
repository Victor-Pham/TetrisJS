var tetris = {};
var rate = 500;
//Draw the grid
tetris.drawPlayField = function(){
	for(var row=0;row<22;row++){
		$('#playfield').append('<tr class="'+row+'"></tr>');
		for (var col=0;col<10;col++){
			$('tr.'+row).append('<td id="'+col+'"></td>');
		}
    }
    
    //hide top two rows
    $('.0').attr('hidden', true);
    $('.1').attr('hidden', true);
}

//Variable to store current coordiates
tetris.origin = {row:2,col:5};
tetris.currentShape = 'I';
tetris.currentCoor;
tetris.color;


//Fill the cells
tetris.fillCells = function(coordinates,fillColor){
	for(var i=0;i<coordinates.length;i++){
		var row = coordinates[i].row;
		var col = coordinates[i].col;
		var $coor = $('.'+row).find('#'+col);
        $coor.attr('bgcolor', fillColor);
        
        if($coor.attr('bgcolor') != ''){
            $coor.attr('background', 'block4.png');
        }
        else{
            $coor.attr('background', '');
            $coor.attr('abbr', '');
        }
	}
}

//reset
tetris.reset = function(coordinates,fillColor){
	
	for (var i=21; i>=0;i--){

		for (var j=0;j<10;j++){

				var $newCoor = $('.'+i).find('#'+j);
                $newCoor.attr('bgcolor', '');

                    $newCoor.attr('background', '');
                    $newCoor.attr('abbr', '');

			}
		}

		tetris.spawn();

}

//Move current shape
tetris.move = function(direction){
	this.fillCells(this.currentCoor,'');

	//move origin
	if(direction === 'right'){
		this.origin.col++;
	} else if (direction === 'left'){
		this.origin.col--;
	}

	this.currentCoor = this.shapeToCoor(this.currentShape,this.origin);

	if(this.ifReverse()){
		if(direction === 'right'){
			this.origin.col--;
		} else if (direction === 'left'){
			this.origin.col++;
		}
	}

	this.currentCoor = this.shapeToCoor(this.currentShape,this.origin);

	this.fillCells(this.currentCoor, this.color);
}

//Rotate current shape
tetris.rotate = function(){
	var lastShape = this.currentShape;
	this.fillCells(this.currentCoor,'');

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

	this.currentCoor = this.shapeToCoor(this.currentShape,this.origin);

	for(var i=0;i<this.currentCoor.length;i++){
		if(this.ifReverse()){
			this.currentShape = lastShape;
		}
	}

	this.currentCoor = this.shapeToCoor(this.currentShape,this.origin);
	this.fillCells(this.currentCoor,this.color);
}

//Define all shapes
tetris.shapeToCoor = function(shape,origin){
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

//Drop shape by one row
tetris.drop = function(){
	var reverse = false;

	this.fillCells(this.currentCoor,'');
	this.origin.row++;
	for(var i=0;i<this.currentCoor.length;i++){
		this.currentCoor[i].row++;
		if(this.ifReverse()){
			reverse = true;
			

		}
	}

	if(reverse){
		console.log(this.origin.row);
		if(this.origin.row <= 3){
			tetris.reset();
		}
		for(var i=0;i<this.currentCoor.length;i++){
			this.currentCoor[i].row--;
		}
		this.origin.row--;
	}

	this.fillCells(this.currentCoor,this.color);

	if(reverse){
        this.fillCells(this.currentCoor,this.color);

        for(var i =0; i < this.currentCoor.length; i++){
            var row = this.currentCoor[i].row;
            var col = this.currentCoor[i].col;
            var $coor = $('.'+row).find('#'+col);
            $coor.attr('abbr', 'block');
        }

		this.emptyFullRow();
		this.spawn();

		
	}

}

tetris.hardDrop = function(){
	clearInterval(gravity)
	rate = 50;
	console.log(rate);
	var gravity = setInterval(function(){
		tetris.drop();
	}, rate);
	if(this.ifReverse()){
		clearInterval(gravity);
		rate = 500;
		console.log(rate);
	}
}

//Spawn random shape
tetris.spawn = function(){
    this.origin = {row:2, col:5};
    var random = Math.floor(Math.random()*7);
    var colorArray = ['#0102F0','#F09F02','#01F0F1','#F0F001','#00FF01', 'F00100','A001EF'];
    this.color = colorArray[random];
    var shapeArray = ['J', 'L', 'I', 'O', 'S','Z', 'T'];
    this.currentShape = shapeArray[random];
    this.currentCoor = this.shapeToCoor(this.currentShape, this.origin);
}

//If we need to reverse
tetris.ifReverse = function(){
	for(var i=0;i<this.currentCoor.length;i++){
		var row = this.currentCoor[i].row;
		var col = this.currentCoor[i].col;
		var $coor = $('.'+row).find('#'+col);
		if($coor.length === 0 || $coor.attr('abbr') === 'block'){
			return true;
		}
	}
	return false;
}

//Empty full row
tetris.emptyFullRow = function(){
	var drops = 0;
	for (var i=21; i>=0;i--){
		var rowIsFull = true;

		for (var j=0;j<10;j++){
			var $coor = $('.'+i).find('#'+j);
			if($coor.attr('abbr')!=='block'){
				rowIsFull = false;
			}

			if(drops>0){
				var $newCoor = $('.'+(i+drops)).find('#'+j);
                $newCoor.attr('bgcolor',$coor.attr('bgcolor'));
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


$(document).ready(function(){
	tetris.drawPlayField();
	tetris.currentCoor = tetris.shapeToCoor(tetris.currentShape,tetris.origin);
    tetris.spawn();
	$(document).keydown(function(e){
		if(e.keyCode === 39){
			tetris.move('right');
		} else if (e.keyCode === 37){
			tetris.move('left');
		} else if (e.keyCode === 38){
			tetris.rotate();
		} else if (e.keyCode === 40){
			tetris.drop();
			clearInterval(autoplay);
		}

	})


	$('#playfield').on('tap', function(e) { 
		tetris.rotate();
		console.log('Rotate'); 
	});
	$('#playfield').on('swiperight', function(e) { 
		tetris.move('right');
		console.log('Move Right'); 
	});	
	$('#playfield').on('swipeleft', function(e) { 
		tetris.move('left');
		console.log('Move Left'); 
	});
	$('#playfield').on('swipedown', function(e) { 
		tetris.drop();

	});
	var gravity = setInterval(function(){
		tetris.drop();
	}, rate);

	$('#autoplayBtn').click(function(){
		if(autoplayEnabled){
			clearInterval(autoplayer)
			autoplayEnabled = false;
		}
		else{
			autoplayer = setInterval(autoplay, 500);
			autoplayEnabled = true;

		}
		console.log(autoplayEnabled);
		console.log(autoplay);
	});

	$('#resetBtn').click(function(){
		tetris.reset();
	});


})


//autoplay
var autoplayEnabled = false;
autoplay = function(){
	var play = 0;
	play = Math.floor(Math.random() * 3 + 1);
	if(play == 1){
		tetris.move('left');
		console.log('LEFT');
	}
	else if(play == 2){
		tetris.move('right');
		console.log('RIGHT');
	}
	else if(play == 3){
		tetris.rotate();
		console.log('ROTATE');
	}


	}

if(autoplayEnabled){
var autoplayer = setInterval(autoplay,500);
}