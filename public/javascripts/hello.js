var color = "black";

if (window.console) {
  console.log("Welcome to your Play application's JavaScript!");
}
$(document).ready(function () {
$(".cell").on("click", function() {
    $(this).css("background", color);
});

$(".yellowButton").on("click", function() {
    color = "yellow"
});

$(".redButton").on("click", function() {
    color = "red"
});

    $(".blackButton").on("click", function() {
        color = "black"
    });

    $(".whiteButton").on("click", function() {
        color = "white"
    });

    $(".greenButton").on("click", function() {
        color = "green"
    });

    $(".blueButton").on("click", function() {
        color = "blue"
    });
});