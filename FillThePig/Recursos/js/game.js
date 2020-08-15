$(document).ready(function() {
    coinGet = new Audio("Recursos/sounds/coinGet.mp3");
    coinLost = new Audio("Recursos/sounds/coinLost.mp3");

    //divs
    var player = $("#player");
    var screenGame = $("#screenGame");
    var gameZone = $("#gameZone");


    var coin = $("#coin");
    var points = $("#points");

    gameZone.mousemove(function(e) {
        // values: e.clientX, e.clientY, e.pageX, e.pageY
        player.css({ top: e.pageY, left: e.pageX, position: 'absolute' });
    });

    function myMove() {
        var coin = $("#coin");
        var pos = 0;
        setInterval(frame, 1);

        function frame() {
            if (isTouching()) {
                pos = 0;
                coin[0].style.left = Math.floor(Math.random() * screenGame[0].clientHeight) + 'px';
                coin[0].style.top = 0;
                points.html(+points.html() + +1);
                coinGet.play();
            } else {
                if (pos == screenGame[0].clientHeight) {
                    //clearInterval(id);
                    coinLost.play();
                    pos = 0;
                    coin[0].style.left = Math.floor(Math.random() * screenGame[0].clientHeight) + 'px';
                    coin[0].style.top = 0;
                } else {

                    pos = pos + 3;
                    coin[0].style.top = pos + 'px';
                }
            }
        }
    }
    $("#start").click(function(e) {
        e.preventDefault();
        screenGame[0].style.cursor = "none";
        $("#start")[0].style.display = "none"
        myMove();
    });

    function isTouching() {
        let horizontalMatch = false;
        let verticalMatch = false;
        let intersect = false;
        let div1 = player[0].getBoundingClientRect();
        let div1Top = div1.top;
        let div1Left = div1.left;
        let div1Right = div1.right
        let div1Bottom = div1.bottom

        let div2 = coin[0].getBoundingClientRect();
        let div2Top = div2.top;
        let div2Left = div2.left;
        let div2Right = div2.right
        let div2Bottom = div2.bottom

        if ((div2Top > div1Top && div2Top < div1Bottom) || (div2Bottom > div1Top && div2Bottom < div1Bottom)) {
            verticalMatch = true
        }

        if ((div2Right > div1Left && div2Right < div1Right) || (div2Left < div1Right && div2Left > div1Left)) {
            horizontalMatch = true
        }

        if (horizontalMatch && verticalMatch) {
            intersect = true;
        }
        return intersect;
    }
});