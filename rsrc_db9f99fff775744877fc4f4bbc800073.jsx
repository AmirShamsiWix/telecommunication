
$(document).ready(function () {
    //button bounce
    let isBouncing = false;
    let buttonBounceTL = gsap.timeline({});
    $(".bouncy").mouseenter(function(e) {
        // alert("hi")
        if (!isBouncing) {
            isBouncing = true;
            buttonBounceTL.to($(this), {duration: 0.1, y: -10, ease: "power1.out"})
                        .to($(this), {duration: 0.1, y: 0, ease: "power1.in"})
                        .to($(this), {duration: 0.08, y: -4, ease: "power1.out"})
                        .to($(this), {duration: 0.08, y: 0, ease: "power1.in", onComplete: function() {isBouncing = false}})
        }
    });    
});
