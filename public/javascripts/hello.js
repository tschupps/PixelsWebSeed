var color = "black"
var colorForController = "s"
var game = 1
var tip = false

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
        if (tip) {
            getTip(this.id)
            tip = false
        } else {
            $(this).css("background", color);
            colorCell(this.id)
        }
    });

    $(".tip").on("click", function() {
        tip = true
    });

    function getTip(id) {
       alert(ajaxCall("/getTip/" + id))
    }
    function colorCell(id) {
        ajaxCall("/colorCell/"+id+"/"+colorForController)
    }

    var app = new Vue({
        el: '#app',
        data: {
            message: 'Hello Vue!'
        }
    })


    function ajaxCall(url){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        xhttp.onload = function (e) {
            console.log(e.currentTarget.responseText);
            // hier function call mit dem Ergebnis
            return e.currentTarget.responseText;
        }
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