if (window.console) {
  console.log("Welcome to your Play application's JavaScript!");
}
$(document).ready(function () {
$(".cell").on("click", function() {
    $(this).css("background", "red");
});

});