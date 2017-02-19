/*
1. define game stage

2. create obstacles
  *define movement rules

3. define player object
  *bound to mouse
  *define hit detection

4. Method of keeping score
  *track collisions
  *track current score
  *track high score
*/
var currentScore = 0;
var highScore = 0;
var collisions = 0;

var scoreBoard = function() {
  currentScore++;

  d3.select('div.current')
    .text('Current score: '+currentScore);
  setTimeout(scoreBoard, 100);
}
scoreBoard();


var board = d3.select('body')
  .append('svg')
  .attr('width', '900px')
  .attr('height', '650px')
  .attr('class', 'canvas')
  .attr('margin', '0 20%');

var player = board.selectAll('player')
  .data([1]) //reads data to assign to individual piece
  .enter() //checks if there are enough objects to assign data to. If not, creates a reference to them
  .append('circle') //creates new piece based on references and assigns data to them, in order
  .attr('fill', '#e67e22')
  .attr('cx', '450px')
  .attr('cy', '325px')
  .attr('r', 20);

//make player follow mouse
board.on('mousemove', function() {
  var loc = d3.mouse(this);
  player
    .attr('cx', loc[0])
    .attr('cy', loc[1]);
});

//BUTTONS AND ENEMIES BELOW THIS LINE
/*
Push into array a set value
  pull out that same ammount
*/

var updateEnemies = function (array,numberOfEnemies=0) {
  if ( array.length > numberOfEnemies ) {
    array.splice(numberOfEnemies);
  } else {
    while ( array.length < numberOfEnemies ) {
      array.push(array.length + 1);
    }
  }
 return array;
}

d3.select('#beginner-button').on('click', function() {
  updateEnemies(enemyArray, 5);
  update(enemyArray);
})

d3.select('#intermediate-button').on('click', function() {
  updateEnemies(enemyArray, 25);
  update(enemyArray);
})

d3.select('#hard-button').on('click', function() {
  updateEnemies(enemyArray, 50);
  update(enemyArray);
})

d3.select('#nightmare-button').on('click', function() {
  updateEnemies(enemyArray, 120);
  update(enemyArray);
})




var enemies = board.selectAll('enemies');

//Update Pattern Function
var enemyArray = [];
var update = function(enemyArray) {
  enemies = board.selectAll('enemies')
    .data(enemyArray)
    .enter()
    .append('svg:image')
    .attr('x',function (d, i) { return 870 * Math.random()+30;})
    .attr('y',function (d, i) { return 620 * Math.random()+30;})
    .attr('width', 50)
    .attr('height', 50)
    .attr("xlink:href","http://cdn.onlinewebfonts.com/svg/img_3969.svg");

  enemies //exit pattern
    .data(enemyArray)
    .exit()
    .remove();

  enemies.on('mouseover', function(){
    collisions++;
    d3.select('div.collisions')
      .text('Collisions: '+collisions);

    if ( currentScore > highScore ) {
      highScore = currentScore;
      d3.select('div.highscore')
        .text('High Score: '+highScore);
    }

    currentScore = 0;
  });

}

function moveEnemies() {
  enemies
    .transition()
    .duration(1000)
    .attr('x',function (d, i) { return 870 * Math.random()+30;})
    .attr('y',function (d, i) { return 620 * Math.random()+30;})

    setTimeout(moveEnemies, 1000);
}
moveEnemies();
