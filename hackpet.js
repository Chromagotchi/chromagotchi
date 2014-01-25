// Init code
$(document).ready(function() {
    var square = $(document.createElement("div"));
    square.addClass("pet");

    $("body").append(square);

    $(square).click(function() {
        $(square).css('background-color', 'blue');
    });
});

//
