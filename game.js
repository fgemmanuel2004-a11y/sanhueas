// SANHUEAS - game.js

const Game={
 canvas:null,ctx:null,width:0,height:0,
 running:false,lastTime:0,delta:0,

 init(){
   this.canvas=document.getElementById("game");
   this.ctx=this.canvas.getContext("2d");
   this.resize();
   window.addEventListener("resize",()=>this.resize());

   Player.init();

   this.running=true;
   requestAnimationFrame(t=>this.loop(t));
 },

 resize(){
   this.width=window.innerWidth;
   this.height=window.innerHeight;
   this.canvas.width=this.width;
   this.canvas.height=this.height;
 },

 loop(time){
   this.delta=(time-this.lastTime)/1000||0;
   this.lastTime=time;
   Player.update(this.delta);
   this.render();
   requestAnimationFrame(t=>this.loop(t));
 },

 render(){
   const c=this.ctx;
   c.fillStyle="#4d6fa9";
   c.fillRect(0,0,this.width,this.height/2);
   c.fillStyle="#333";
   c.fillRect(0,this.height/2,this.width,this.height/2);

   c.strokeStyle="#fff";
   c.beginPath();
   c.moveTo(this.width/2-8,this.height/2);
   c.lineTo(this.width/2+8,this.height/2);
   c.moveTo(this.width/2,this.height/2-8);
   c.lineTo(this.width/2,this.height/2+8);
   c.stroke();

   c.fillStyle="#fff";
   c.font="16px Arial";
   c.fillText(`X:${Player.x.toFixed(2)} Y:${Player.y.toFixed(2)}`,20,30);
   c.fillText(`ANG:${(Player.angle*180/Math.PI).toFixed(1)}°`,20,55);
 }
};

window.addEventListener("load",()=>Game.init());
