// Define canvas and get the context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// RECT
ctx.beginPath();
//  FRM L,FRM,T    w ,  h
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = '#FF0000';
ctx.fill();
ctx.closePath();

// BALL
ctx.beginPath();
//x,y arcs center, R, start, end,   clockwise, true is counter
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.strokeStyle = 'green';
// ctx.stroke();
ctx.fillStyle = 'green';
ctx.fill();
ctx.closePath();
