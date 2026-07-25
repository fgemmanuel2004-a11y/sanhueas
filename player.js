// SANHUEAS - player.js

const Player={
 x:3.5,
 y:3.5,
 angle:0,
 speed:3,
 sprint:5,
 keys:{},

 init(){
   window.addEventListener("keydown",e=>this.keys[e.code]=true);
   window.addEventListener("keyup",e=>this.keys[e.code]=false);

   Game.canvas.addEventListener("click",()=>{
      Game.canvas.requestPointerLock();
   });

   document.addEventListener("mousemove",e=>{
      if(document.pointerLockElement!==Game.canvas) return;
      this.angle+=e.movementX*0.0025;
   });
 },

 update(dt){
   let s=this.keys["ShiftLeft"]?this.sprint:this.speed;
   let dx=0,dy=0;

   if(this.keys["KeyW"]){
      dx+=Math.cos(this.angle)*s*dt;
      dy+=Math.sin(this.angle)*s*dt;
   }
   if(this.keys["KeyS"]){
      dx-=Math.cos(this.angle)*s*dt;
      dy-=Math.sin(this.angle)*s*dt;
   }
   if(this.keys["KeyA"]){
      dx+=Math.cos(this.angle-Math.PI/2)*s*dt;
      dy+=Math.sin(this.angle-Math.PI/2)*s*dt;
   }
   if(this.keys["KeyD"]){
      dx+=Math.cos(this.angle+Math.PI/2)*s*dt;
      dy+=Math.sin(this.angle+Math.PI/2)*s*dt;
   }

   this.x+=dx;
   this.y+=dy;
 }
};
