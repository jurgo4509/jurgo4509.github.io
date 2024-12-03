export function drawClock(secondaryColor = '#F00', primaryColor = '#000', canvasName = "clockCanvas", canvasSize = 200){
    // set up canvas
    const canvas = document.getElementById(canvasName);
    const ctx = canvas.getContext("2d");

    canvasSize /= 2;
    ctx.translate(canvasSize, canvasSize);

    // read time (seconds, minutes and hours)
    const d = new Date();   
    const sec = d.getSeconds();
    const min = d.getMinutes();
    const hr = d.getHours();

    // set colors
    ctx.fillStyle = primaryColor;     
    ctx.strokeStyle = primaryColor;

    // set variables
    const markerOffset = 10 * (canvasSize / 100);
    const minMarkerLength = 7 * (canvasSize / 100);
    const hourMarkerLength = 12 * (canvasSize / 100);
    const handWidth = 6 * (canvasSize / 100);
    const secondHandWidth = 2 * (canvasSize / 100);

    // place the orgin point in the center and clear the canvas
    ctx.setTransform(1, 0, 0, 1, canvasSize, canvasSize);  
    ctx.clearRect(-canvasSize,-canvasSize, 2*canvasSize, 2*canvasSize);

    // draw the marks on the clock
    for(let i = 0; i < 60; i++){  
        ctx.rotate(6 * Math.PI / 180);
        ctx.beginPath();
        ctx.moveTo(canvasSize - markerOffset, 0);

        // draw hour marks
        if((i+1) % 5 == 0){
            ctx.lineWidth = 3 * (canvasSize / 100);
            ctx.lineTo(canvasSize - markerOffset - hourMarkerLength, 0);

        // draw minute marks
        } else {
            ctx.lineWidth = 2 * (canvasSize / 100);
            ctx.lineTo(canvasSize - markerOffset - minMarkerLength, 0);
        }
        ctx.stroke();
    }
    
    // draw and rotate the hour hand
    ctx.setTransform(1, 0, 0, 1, canvasSize, canvasSize); 
    ctx.rotate((hr + min / 60) * 30 * Math.PI / 180);
    ctx.fillRect(handWidth/-2, 0, handWidth, canvasSize / -2)

    // draw and rotate the minute hand
    ctx.setTransform(1, 0, 0, 1, canvasSize, canvasSize); 
    ctx.rotate((min + sec / 60) * 6 * Math.PI / 180);
    ctx.fillRect(handWidth/-2, 0, handWidth, canvasSize / -2 * 1.5)

    // draw the larger black dot in the center
    ctx.beginPath();    
    ctx.arc(0,0,5 * (canvasSize / 100),0,2*Math.PI);
    ctx.fill();

    // draw the smaller red dot in the center
    ctx.fillStyle = secondaryColor;  
    ctx.beginPath();
    ctx.arc(0,0,2 * (canvasSize / 100),0,2*Math.PI);
    ctx.fill();
    
    // draw and rotate the second hand
    ctx.setTransform(1, 0, 0, 1, canvasSize, canvasSize);
    ctx.rotate((sec) * 6 * Math.PI / 180);
    ctx.fillRect(secondHandWidth/-2, 0, secondHandWidth, canvasSize / -2 * 1.5)
    
    // output the time in text format
    time.innerHTML = hr + ':' + (String(min).padStart(2, '0')) + ':' + (String(sec).padStart(2, '0'));
}