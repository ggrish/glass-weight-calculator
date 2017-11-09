
$(function () {
    //----- OPEN
    $('[data-popup-open]').on('click', function (e) {
        var targeted_popup_class = $(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
        $('body').css('overflowY', 'hidden');
        e.preventDefault();
    });

    //----- CLOSE
    $('[data-popup-close]').on('click', function (e) {
        var targeted_popup_class = $(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
        $('body').css('overflowY', 'auto');
        e.preventDefault();
    });
});


$(document).on("change", "input[name='shape']", function (e) {
    e.preventDefault();
    if ($(this).val() == "circle") {
        $("#divlength").hide();
        $("#divdia").show();
    }
    else {
        $("#divdia").hide();
        $("#divlength").show();
    }
});

var glassThickness = [
    {display: "3/6\"", value: "0.1875"},
    {display: "1/4\"", value: "0.25"},
    {display: "3/8\"", value: "0.375"},
    {display: "1/2\"", value: "0.5"},
    {display: "3/4\"", value: "0.75"}];

var mirrorThickness = [
    {display: "1/4\"", value: "0.25"}];

$(document).on("change", "input[name='type']", function (e) {
    switch ($(this).val()) {
        case 'glass':
            list(glassThickness);
            break;
        case 'mirror':
            list(mirrorThickness);
            break;

        default: //default child option is blank
            list(glassThickness);
            break;
    }
});

//function to populate child select box
function list(array_list) {
    $("#calthickness").html(""); //reset child options
    $(array_list).each(function (i) { //populate child options
        $("#calthickness").append("<option value=\"" + array_list[i].value + "\">" + array_list[i].display + "</option>");
    });
}
function getWeightCalculated() {
    var length = 0;
    var width = 0;
    var diameter = 0;
    var radius = 0;
    var thickness = 0;
    var density = 0;
    var weight = 0;

    var type = $("input[name='type']:checked").val();
    var shape = $("input[name='shape']:checked").val();
    thickness = $("#calthickness").val();
    if (shape == 'circle') {
        diameter = $("#diameter").val();
        radius = diameter / 2;
    }
    else {
        length = $("#length").val();
        width = $("#width").val();
    }

    if (thickness == "0.25")
        density = 0.0833687190375088;
    else if (thickness == "0.1875")
        density = 0.0907949988204765;
    else if (thickness == "0.375")
        density = 0.0926437367303609;
    else if (thickness == "0.5")
        density = 0.0903235668789809;
    else if (thickness == "0.75")
        density = 0.0923583864118896;


    if (type == "glass" || type == "mirror") {
        switch (shape) {
            case "circle":
                weight = (((3.14) * ((radius) * (radius))) * (thickness)) * (density);
                break;
            case "oval":
                weight = ((4 / 3) * (((3.14) * ((length / 2) * (width / 2))) * (thickness))) * (density);
                break;
            case "rectangle":
                weight = ((((length) * (width))) * (thickness)) * (density);
                break;
            case "square":
                weight = ((((length) * (width))) * (thickness)) * (density);
                break;
        }
    }
    $("#weight").html(weight.toFixed(2));
}
