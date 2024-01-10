var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;
function resetGame() {
  $("#level-title").text("Game Over, BIYAAATCH !!!!");
  setTimeout(function () {
    $("#level-title").text("Press any key to start over!");
  }, 1000);
  started = false;
  level = 0;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
}
function checkAnswer() {
  if (
    userClickedPattern[userClickedPattern.length - 1] ===
    gamePattern[userClickedPattern.length - 1]
  ) {
    console.log("Right hain");
  } else {
    resetGame();
    return;
  }
  if (userClickedPattern.length === level) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  } else {
    alert("You Donkey! Use your mouse, not your keyboard");
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer();
});

function nextSequence() {
  level++;
  userClickedPattern.length = 0;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
