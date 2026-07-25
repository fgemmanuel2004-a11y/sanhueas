const canvas=document.getElementById('gameCanvas');
const ctx=canvas.getContext('2d');
function resize(){canvas.width=innerWidth;canvas.height=innerHeight;}
addEventListener('resize',resize);resize();
let last=performance.now(),fps=0;
function loop(t){
 fps=Math.round(1000/(t-last));last=t;
 ctx.fillStyle='#5aa9ff';ctx.fillRect(0,0,canvas.width,canvas.height/2);
 ctx.fillStyle='#444';ctx.fillRect(0,canvas.height/2,canvas.width,canvas.height/2);
 ctx.fillStyle='white';ctx.font='18px Arial';
 ctx.fillText('FPS: '+fps,10,24);
 ctx.fillText('SANHUEAS - Motor Base',10,48);
 ctx.beginPath();
 ctx.moveTo(canvas.width/2-10,canvas.height/2);
 ctx.lineTo(canvas.width/2+10,canvas.height/2);
 ctx.moveTo(canvas.width/2,canvas.height/2-10);
 ctx.lineTo(canvas.width/2,canvas.height/2+10);
 ctx.strokeStyle='white';ctx.stroke();
 requestAnimationFrame(loop);
}
requestAnimationFrame(loop);