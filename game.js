const canvas=document.getElementById('game');
const ctx=canvas.getContext('2d');

function resize(){
 canvas.width=window.innerWidth;
 canvas.height=window.innerHeight;
}
resize();
window.addEventListener('resize',resize);

let frames=0,fps=0;
setInterval(()=>{
 fps=frames;
 frames=0;
 document.getElementById('fps').textContent=fps;
},1000);

function draw(){
 frames++;
 ctx.fillStyle='#5478b9';
 ctx.fillRect(0,0,canvas.width,canvas.height/2);
 ctx.fillStyle='#3a3a3a';
 ctx.fillRect(0,canvas.height/2,canvas.width,canvas.height/2);

 ctx.strokeStyle='white';
 ctx.beginPath();
 ctx.moveTo(canvas.width/2-10,canvas.height/2);
 ctx.lineTo(canvas.width/2+10,canvas.height/2);
 ctx.moveTo(canvas.width/2,canvas.height/2-10);
 ctx.lineTo(canvas.width/2,canvas.height/2+10);
 ctx.stroke();

 requestAnimationFrame(draw);
}
draw();

document.getElementById('startButton').addEventListener('click',()=>{
 document.getElementById('startScreen').style.display='none';
 if(canvas.requestPointerLock) canvas.requestPointerLock();
});
