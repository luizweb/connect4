
const canvas = document.getElementById('example');
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#Ff005d';
ctx.fillRect(80,90,30,30);

// *** rectangle ***
//fillRect(x, y, width, height); //Draws a filled rectangle.
//strokeRect(x, y, width, height); //Draws a rectangular outline.
//clearRect(x, y, width, height); //Clears the specified rectangular area, making it fully transparent.

// *** paths ***
// beginPath(); // Creates a new path. Once created, future drawing commands are directed into the path and used to build the path up.
// closePath(); // Closes the path so that future drawing commands are once again directed to the context.
// stroke(); // Draws the shape by stroking its outline.
// fill(); // Draws a solid shape by filling the path's content area.
// moveTo(x, y); // Moves the pen to the coordinates specified by x and y.
// lineTo(x, y); // Draws a line from the current drawing position to the position specified by x and y.

// start the path
ctx.beginPath();
// starting position is x=10, y=10
ctx.moveTo(10, 10);
// draw the line that has final coordinates x=250, y=50
ctx.lineTo(100, 10);
 
// .stroke() executes the drawing
ctx.stroke();
 
// start a new line from these coordinates: x=250, y=50
ctx.moveTo(100, 10);
// draw the line that has final coordinates x=250, y=100
ctx.lineTo(100, 100);
// .stroke() executes the drawing
ctx.stroke();
 
// close the path
ctx.closePath();


// const radians = (Math.PI / 180) * degrees;
// *** arcs ***
//arc(x, y, radius, startAngle, endAngle, anticlockwise);
// Draws an arc which is centered at (x, y) position with
// radius starting at startAngle and ending at endAngle going
// in the given direction indicated by anticlockwise (defaulting to clockwise).

//arcTo(x1, y1, x2, y2, radius);
// Draws an arc with the given control points and radius,
// connected to the previous point by a straight line.




ctx.beginPath();
// ctx.arc(x, y, radius, startAngle, endAngle)
ctx.arc(60, 60, 55, 0, Math.PI * 2);
ctx.lineWidth = 10;
ctx.strokeStyle = 'green'; // !
ctx.stroke();
ctx.closePath();
 
ctx.beginPath();
ctx.arc(15, 17, 35, 0, Math.PI * 2);
ctx.fillStyle = 'red'; // !
// fills the inner circle with red color
ctx.fill();
ctx.closePath();