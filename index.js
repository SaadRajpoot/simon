var levelCounter = 0;
var clickCounter = 0;
var userSeq = [];
var gameSeq = [];

$(document).keypress(function(event) {
  if (event.key === "a" || event.key === "A") {
    displayLevel();
    start();
  }
});

function start() {
  var randomColor = getRandomColour();
  buttonAnimation(randomColor);
  gameSeq.push(randomColor);
  console.log("game inserted 1"+randomColor);

  $(".btn").click(function() {
    var id = $(this).attr("id");
    buttonAnimation(id);
    console.log("User pressed "+id);
    userSeq.push(id);
    if (compareSeq()) {
      clickCounter++;
      console.log("CLick counter "+clickCounter);
      if(userSeq.length==gameSeq.length)
      {
        randomColor = getRandomColour();
        setTimeout(function() {
          buttonAnimation(randomColor);
          console.log(randomColor+ " random color");
        }, 1000);
        displayLevel(levelCounter++);
        userSeq=[];
        gameSeq.push(randomColor);
        clickCounter=0;
      }
    }
    else {
      playSound("wrong");
      userSeq = gameSeq = [];
      $("#level-title").text("You Lose. Reload to start again.");
    }
  });
}

function playSound(id) {
  var audio = new Audio("sounds/" + id + ".mp3");
  audio.play();
}

function buttonAnimation(id) {
  $("#" + id).addClass("pressed");
  setTimeout(function() {
    playSound(id);
    $("#" + id).removeClass("pressed");
  }, 100);
}

function getRandomColour() {
  var num = Math.floor((Math.random() * 4) + 1);
  switch (num) {
    case 1: return "green";
    case 2: return "red";
    case 3: return "yellow";
    case 4: return "blue";
  }
}

function displayLevel() {
  $("#level-title").text("Level " + (levelCounter + 1));
}

function compareSeq() {

  if (userSeq[clickCounter] == gameSeq[clickCounter]) return true;

  return false;
}
