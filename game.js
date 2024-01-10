const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

function resetGame() {
  $("#level-title").text("Game Over, BIYAAATCH !!!!");
  new Audio("sounds/wrong.mp3").play();
  setTimeout(() => {
    $("#level-title").text("Press any key to start over!");
  }, 1000);
  started = false;
  level = 0;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
}

function checkAnswer() {
  if (
    userClickedPattern[userClickedPattern.length - 1] !==
    gamePattern[userClickedPattern.length - 1]
  ) {
    resetGame();
    return;
  }

  if (userClickedPattern.length === level) {
    setTimeout(nextSequence, 1000);
  }
}

$(document).keypress(() => {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  } else {
    alert("You Donkey! Use your mouse, not your keyboard");
  }
});

$(".btn").click(function () {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer();
});

function nextSequence() {
  level++;
  userClickedPattern.length = 0;
  $("#level-title").text(`Level ${level}`);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  new Audio(`sounds/${name}.mp3`).play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}
