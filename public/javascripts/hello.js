
importPackage(de.htwg.se.pixels.controller.Controller);
var color = "black";

Controller.colourCell(row, col, color)
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