var color = "black";
var colorForController = "s";
var game = 1;
var tip = false;

$(document).ready(function () {

    $(".cell").on("click", function() {
        if (tip) {
            getTip(this.id);
            tip = false;
        } else {
            $(this).css("background", color);
            colorCell(this.id);
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

    Vue.component('select2', {
        props: ['options', 'value'],
        template: '#select2-template',
        mounted: function () {
            var vm = this;
            $(this.$el)
            // init select2
                .select2({ data: this.options })
                .val(this.value)
                .trigger('change')
                // emit event on change.
                .on('change', function () {
                    vm.$emit('input', this.value)
                })
        },
        watch: {
            value: function (value) {
                // update value
                $(this.$el).val(value);
                changeColor(value);
            },
            options: function (options) {
                // update options
                $(this.$el).empty().select2({ data: options })
            }
        },
        destroyed: function () {
            $(this.$el).off().select2('destroy')
        }

    });

    var vm = new Vue({
        el: '#el',
        template: '#demo-template',
        data: {
            selected: 1,
            options: [
                { id: 1, text: 'black'},
                { id: 2, text: 'red'},
                { id: 3, text: 'yellow'},
                { id: 4, text: 'green'},
                { id: 5, text: 'blue'},
                { id: 6, text: 'white'}
            ]
        }
    });

    function ajaxCall(url){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        xhttp.onload = function (e) {
            console.log(e.currentTarget.responseText);
            // hier function call mit dem Ergebnis

        };
        xhttp.send();
    }


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
    function changeColor(choice){
        switch(choice) {
            case "1":
                color = "black";
                colorForController = "s";
                break;
            case "2":
                color = "red";
                colorForController = "r";
                break;
            case "3":
                color = "yellow";
                colorForController = "y";
                break;
            case "4":
                color = "green";
                colorForController = "g";
                break;
            case "5":
                color = "blue";
                colorForController = "b";
                break;
            case "6":
                color = "white";
                colorForController = "w";
                break;
            default:
                color = "black";
                colorForController = "s";
                break;
        }
    }
});