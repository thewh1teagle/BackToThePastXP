function closeCmd() {
    document.getElementsByClassName("cmd-window")[0].style.display = "none"
}

function openCmd() {
    document.getElementsByClassName("cmd-window")[0].style.display = "block"
}


function rightClick(e) {
    console.log("right click")
    e.preventDefault();

    if (document.getElementById("context-menu")
        .style.display == "block")
        hideMenu();
    else {
        var menu = document.getElementById("context-menu")

        menu.style.display = 'block';
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
    }
}


function hideMenu() {
    document.getElementById("context-menu")
        .style.display = "none"
}

(function() {
    document.oncontextmenu = rightClick;
    document.onclick = hideMenu;




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


// document.getElementById("start-btn").addEventListener("mousedown", function(e) {
//     document.getElementById("start-btn").style.width = "6.4%"
//     setTimeout(function() {
//         document.getElementById("start-btn").style.width = "6.3%"
//     }, 300)
// })








































var Paper = can.Control({
    defaults: {
        rect: {
            minWidth: 10,
            minHeight: 10
        }
    }
}, {
    /**
     * Initialize
     */
    init: function() {

        // Bind event handlers
        this.element.on('mousedown.paper', $.proxy(this.startDrawRect, this));
    },

    /**
     * Start drawing a rectangle
     *
     * @param   e
     */
    startDrawRect: function(e) {

        // Get canvas offset
        var offset = this.element.offset();
        this.canvasOffsetLeft = offset.left;
        this.canvasOffsetTop = offset.top;

        // Save start positions
        this.drawStartX = e.pageX - this.canvasOffsetLeft;
        this.drawStartY = e.pageY - this.canvasOffsetTop;

        // Create the rectangle
        this.drawingRect = this.createRect(this.drawStartX, this.drawStartY, 0, 0);

        // Bind event handlers
        this.element.on('mousemove.paper', $.proxy(this.drawRect, this));
        this.element.on('mouseup.paper', $.proxy(this.endDrawRect, this));

    },

    /**
     * Draw the rectangle
     *
     * @param   e
     */
    drawRect: function(e) {

        var currentX = e.pageX - this.canvasOffsetLeft;
        var currentY = e.pageY - this.canvasOffsetTop;

        // Calculate the position and size of the rectangle we are drawing
        var position = this.calculateRectPos(this.drawStartX, this.drawStartY, currentX, currentY);

        // Set position and size
        this.drawingRect.css(position);
    },

    /**
     * Finish drawing the rectangle
     *
     * @param   e
     */
    endDrawRect: function(e) {

        var currentX = e.pageX - this.canvasOffsetLeft;
        var currentY = e.pageY - this.canvasOffsetTop;

        // Calculate the position and size of the rectangle we are drawing
        var position = this.calculateRectPos(this.drawStartX, this.drawStartY, currentX, currentY);

        if (position.width < this.options.rect.minWidth || position.height < this.options.rect.minHeight) {

            // The drawn rectangle is too small, remove it
            this.drawingRect.remove();
        } else {

            // Set position and size
            this.drawingRect.css(position);

            // The rectangle is big enough, select it
            this.selectRect(this.drawingRect);
        }

        // Unbind event handlers
        this.element.off('mousemove.paper');
        this.element.off('mouseup.paper');
        this.drawingRect.remove();
    },

    /**
     * Create a rectangle
     *
     * @param   x
     * @param   y
     * @param   w
     * @param   h
     */
    createRect: function(x, y, w, h) {

        return $('<div/>').addClass('rect').css({
            left: x,
            top: y,
            width: w,
            height: h
        }).appendTo(this.element);
    },

    /**
     * Select the given rectangle
     *
     * @param   rect
     */
    selectRect: function(rect) {

        // Deselect the previous selected rectangle
        this.selectedRect && this.selectedRect.removeClass('selected');

        // Select the given rectangle
        this.selectedRect = rect;
        this.selectedRect.addClass('selected');
    },

    /**
     * Calculate the start position and size of the rectangle by the mouse coordinates
     *
     * @param   startX
     * @param   startY
     * @param   endX
     * @param   endY
     * @returns {*}
     */
    calculateRectPos: function(startX, startY, endX, endY) {

        var width = endX - startX;
        var height = endY - startY;
        var posX = startX;
        var posY = startY;

        if (width < 0) {
            width = Math.abs(width);
            posX -= width;
        }

        if (height < 0) {
            height = Math.abs(height);
            posY -= height;
        }

        return {
            left: posX,
            top: posY,
            width: width,
            height: height
        };
    }
});

$(function() {
    var paper = new Paper('#canvas-mouse-hold', {});
});