$(document).ready(function() {
    function animasyon(){
        if (window.location.pathname.includes("sepet")) { 
            $(".sepet-basligi").css({
                "position": "absolute",
                "left": "-100%" 
            }).animate({
              "left": "0" // Flexbox ile ortalama yaptığımız için left: 0 yeterli
            }, 1000); 
        }
    }
    animasyon()

    $(".lightBtn").click(function() {
        $("body").removeClass("dark")
    });
    
    $(".darkBtn").click(function() {
        $("body").addClass("dark");
    });
  });