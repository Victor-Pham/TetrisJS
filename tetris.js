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
var heldItem;
tetris.index;
var linesCleared = 0;


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
	
	heldItem = '';
	numSwaps = 0;

	$('td#hold').attr('background', '');

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
		bestCol = -1;

		
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

var numSwaps = 0;

tetris.hold = function(){
	console.log("NUM SWAPS: " + numSwaps);
	var tempitem;
	console.log("HELD: " + heldItem);


	if(heldItem == null){	//first hold
		this.fillCells(this.currentCoor,'');	//clear current block

		heldItem = this.index;
		tetris.spawn();
		//console.log("HELD ITEM: " + this.heldItem);
	}
	else if(numSwaps == 0){
		this.fillCells(this.currentCoor,'');	//clear current block

		tempItem = this.index;;
		tetris.spawnHeld(heldItem);
		heldItem = tempItem;
		numSwaps++;

	}




	console.log("HELD INDEX: --- " + heldItem);
	$('td#hold').attr('background', 'tetromino' + heldItem +'.png');


}
//Spawn random shape
tetris.spawn = function(){
	generateQueue();
	numSwaps = 0;
    this.origin = {row:2, col:5};
	var random = Math.floor(Math.random()*7);
	var index = queue.shift();
	this.index = index;
	console.log("INDEX: " + index);
    var colorArray = ['#0102F0','#F09F02','#01F0F1','#F0F001','#00FF01', 'F00100','A001EF'];
	var shapeArray = ['J', 'L', 'I', 'O', 'S','Z', 'T'];
	
	this.color = colorArray[index];
    this.currentShape = shapeArray[index];
    this.currentCoor = this.shapeToCoor(this.currentShape, this.origin);
}

tetris.spawnHeld = function(index){
	generateQueue();
    this.origin = {row:2, col:5};
	console.log("INDEX: " + index);
    var colorArray = ['#0102F0','#F09F02','#01F0F1','#F0F001','#00FF01', 'F00100','A001EF'];
	var shapeArray = ['J', 'L', 'I', 'O', 'S','Z', 'T'];
	
	this.color = colorArray[index];
    this.currentShape = shapeArray[index];
	this.currentCoor = this.shapeToCoor(this.currentShape, this.origin);
	

}


var queue = [];
var bag = [];

shuffleBag = function(){
	var bag = [0, 1, 2, 3, 4, 5, 6];
	var shuffledBag = [];
	var index;
	while(bag.length != 0){
		index = Math.floor(Math.random() * bag.length);
		shuffledBag.push(bag[index]);
		bag.splice(index, 1);
	}

	return shuffledBag;
}
generateQueue = function(){
		if(bag.length == 0){
			bag = shuffleBag();
		}
		if(queue.length == 0){
			queue.push(bag.pop());
			queue.push(bag.pop());
			queue.push(bag.pop());


		}

		queue.push(bag.pop());

		$('td#next.first').attr('background', 'tetromino' + queue[1] +'.png');
		$('td#next.second').attr('background', 'tetromino' + queue[2] +'.png');
		$('td#next.third').attr('background', 'tetromino' + queue[3] +'.png');


	//console.log("BAG: " + bag);
	//console.log("QUEUE: " + queue);
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
			linesCleared++;
			$('p#linesCleared').text("Lines Cleared: " + linesCleared);

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
		else if(e.keyCode === 67){
			tetris.hold();
			console.log("HOLD!");
		}

	})

	var gravity = setInterval(function(){
		tetris.drop();
	}, rate);

	$('#autoplayBtn').click(function(){
		if(autoplayEnabled){
			clearInterval(autoplayer)
			clearInterval(gravity);
			autoplayEnabled = false;
			gravity = setInterval(function(){tetris.drop();}, 400);
		}
		else{
			autoplayer = setInterval(autoplay, 50);
			autoplayEnabled = true;
			clearInterval(gravity);
			gravity = setInterval(function(){tetris.drop();}, 50);


		}

	//mobile controls
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


	
		console.log(autoplayEnabled);
		console.log(autoplayer);
	});

	$('#resetBtn').click(function(){
		tetris.reset();
	});


})


//autoplay
var autoplayEnabled = false;
var highestRating = 0;
var bestCol = -1;
var bestRotation;

tetris.testOrigin = {row:0, col:0};
tetris.testCoor;
tetris.testCurrentShape = 0;

autoplay = function(){
	if(bestCol == -1){
		tetris.generateBestMove();
	//console.log("BEST COL: " + bestCol);
	}
	else{
		//console.log("DONE>>> SPAWNING");
		if(tetris.origin.col > bestCol)
			tetris.move('left');
		else if(tetris.origin.col < bestCol)
			tetris.move('right');
		else{
			if(tetris.currentShape != bestRotation){
				tetris.rotate();
			}
		}
	}
	var play = 0;
	play = 0;// Math.floor(Math.random() * 3 + 1);
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

tetris.spawnTestPiece = function(col){
	this.testOrigin = {row:0, col:col}
	this.testCurrentShape = this.currentShape;
	this.testCoor = this.shapeToCoor(this.currentShape, this.testOrigin);
}

tetris.setAttr = function(coordinates, attr){
	for(var i=0;i<coordinates.length;i++){
		var row = coordinates[i].row;
		var col = coordinates[i].col;
		var $coor = $('.'+row).find('#'+col);
        $coor.attr('abbr', attr);

	}
}



tetris.generateBestMove = function(){
	//traverse through rotations/positions
	//store location with highest moveRating
	highestRating = 0;

	var rating;
	for(var i = 0; i < 4; i++){
		tetris.spawnTestPiece(0);

		tetris.dropTest();
		tetris.rotate();
		tetris.testCurrentShape = tetris.currentShape;
	}

	console.log("HIGHEST RATING: " + highestRating + " BEST COL: " + bestCol);
	console.log("BEST ROTATION: " + bestRotation);

	

}

getMoveRating = function(){
	var rating = 0;	//generates rating based on average height of blocks
	//console.log(".......");
	//for (var row =21; row>=tetris.testOrigin.row - 5;row--){
	//	for (var col=0;col<10;col++){
	//			var $coor = $('.'+row).find('#'+col);
	//			if($coor.attr('bgcolor') != ''){
	//				rating += row * 100;
	//		}
	//	}
	//}
	for(var i=0;i<tetris.testCoor.length;i++){
		rating  += tetris.testCoor[i].row;


	}
	return rating;
}

//Drop shape by one row
tetris.dropTest = function(){
	while(this.testOrigin.col < 10){
			
		var reverse = false;

		this.testOrigin.row++;
		for(var i=0;i<this.testCoor.length;i++){
			this.testCoor[i].row++;
			if(this.ifReverseTest()){
				reverse = true;
				

			}
		}

		if(reverse){
			//console.log(this.testOrigin.row);
			for(var i=0;i<this.testCoor.length;i++){
				this.testCoor[i].row--;
			}
			this.testOrigin.row--;
		}


		if(reverse){
			this.fillCellsTest(this.testCoor, 'black');
			rating = getMoveRating();
			this.fillCells(this.testCoor, '');

			if(rating > highestRating){
				highestRating = rating;
				bestCol = this.testOrigin.col;
				bestRotation = this.testCurrentShape;
			}
			//console.log("RATING: " + rating + " COL: " + bestCol);
			this.testOrigin.col++;

			this.spawnTestPiece(this.testOrigin.col);


		}
	}
}


tetris.ifReverseTest = function(){

		for(var i=0;i<this.testCoor.length;i++){
			var row = this.testCoor[i].row;
			var col = this.testCoor[i].col;
			var $coor = $('.'+row).find('#'+col);
			if(row == 22 || $coor.attr('abbr') === 'block'){
				return true;
				
			}
		}

	return false;
}
tetris.fillCellsTest = function(coordinates,fillColor){
	for(var i=0;i<coordinates.length;i++){
		var row = coordinates[i].row;
		var col = coordinates[i].col;
		var $coor = $('.'+row).find('#'+col);
        $coor.attr('bgcolor', fillColor);

	}
}