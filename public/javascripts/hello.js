var color = "black"
var colorForController = "s"
var game = 1

if (window.console) {
  console.log("Welcome to your Play application's JavaScript!");
}

$(document).ready(function () {

    $(".Game1").on("click", function() {
        game = 1
        window.location.replace("http://localhost:9000/game/" + game);
    });

    $(".Game2").on("click", function() {
        game = 2
        window.location.replace("http://localhost:9000/game/" + game);
    });

    $(".Game3").on("click", function() {
        game = 3
        window.location.replace("http://localhost:9000/game/" + game);
    });

    $(".cell").on("click", function() {
        $(this).css("background", color);
        colorCell(this.id);
    });

    function colorCell(id) {
        console.log("da");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("id");
            }
        };
        console.log("test")
        console.log(xhttp)
        xhttp.open("GET", "/colorCell/"+id+"/"+colorForController, true);
        xhttp.send();
    }

    $(".yellowButton").on("click", function() {
        color = "yellow"
        colorForController = "y"
    });

    $(".redButton").on("click", function() {
        color = "red"
        colorForController = "r"

    });

    $(".blackButton").on("click", function() {
        color = "black"
        colorForController = "s"
    });

    $(".whiteButton").on("click", function() {
        color = "white"
        colorForController = "w"
    });

    $(".greenButton").on("click", function() {
        color = "green"
        colorForController = "g"

    });

    $(".blueButton").on("click", function() {
        color = "blue"
        colorForController = "b"

    });
});