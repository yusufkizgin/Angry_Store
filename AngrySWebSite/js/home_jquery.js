$(document).ready(function(){
    $("#hideP").click(function(){
        $("#hideP").hide();
    });

    $(".new").click(function(){
        $(".new").css("background-color", "red");
    })

    $("#name").focus(function(){
        $(".container").css("background-color", "rgba(21, 20, 20, 1)");
    })

    $("#contactSubmit").click(function(){
        alert("Talebiniz İletilmiştir!")
    })

    var sevgiMesaji = "Güne uygun kombin için havadurumunu kontrol etmeyi unutmayın :)";

    $("#divHD").mouseenter(function() {
        $("#sevgi").text(sevgiMesaji).css("margin-left", "30px").fadeIn(500)
    })

    $("#divHD").mouseleave(function() {
        $("#sevgi").fadeOut(500)
    });

    $("#bilgiButonu").click(function() {
        $("#bilgiKutusu").toggle();
    });

});



