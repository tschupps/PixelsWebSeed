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

    function colorCell(id, color) {
        console.log(id)
        console.log(color)
        document.getElementById(id).style.backgroundColor = color;
    }

    function getColor(color) {
        switch(color) {
            case "red":
                return "red";
            case "gre":
                return "green";
            case "blu":
                return "blue";
            case "yel":
                return "yellow";
            case "bla":
                return "black";
            case "emp":
                return "white";
        }
    }

    function ajaxCall(url){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        xhttp.send();
        return xhttp.responseText;
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

    var socket = new WebSocket("ws://localhost:9000/webSocket");
    setInterval(function(){socket.send("ping"); }, 3000);
    socket.onmessage = function(message){
        var msg = JSON.parse(message.data)
        for (var key in msg.cells) {
            if (msg.cells.hasOwnProperty(key)) {
                var val = msg.cells[key];
                console.log(key);
                colorCell(key, getColor(val))
            }
        }
    }
});