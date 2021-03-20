function closeCmd() {
    document.getElementsByClassName("cmd-window")[0].style.display = "none"
}

function openCmd() {
    document.getElementsByClassName("cmd-window")[0].style.display = "block"
}


(function() {

    document.body.style.cursor = "progress"

    try {
        audio.play()
        var audio = document.getElementById('my_audio')
    } catch (e) {
        setTimeout(function() {
            startupFinish()
        }, 2000)
    }


})()

function startupFinish() {
    // document.getElementById("video-bg").style.display = "none"
    document.body.style.cursor = ""
    document.getElementById("startup-img").style.display = "none"
}


const start_btn_click = function() {
    console.log("click")
    el = document.getElementById("programs")
    display = el.style.display
    display !== "block" ? el.style.display = "block" : el.style.display = "none"
}




dragElement(document.getElementsByClassName("cmd-window")[0]);




function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


document.getElementById("start-btn").addEventListener("mousedown", function(e) {
    document.getElementById("start-btn").style.width = "6.4%"
    setTimeout(function() {
        document.getElementById("start-btn").style.width = "6.3%"
    }, 300)
})