const Engine={
started:false,
start(){
 if(this.started)return;
 this.started=true;
 if(window.State) State.set(State.PLAYING);
 console.log('Motor iniciado');
},
update(){
 if(window.Input && Input.keys['escape']){
   State.set(State.PAUSE);
 }
}
};
setInterval(()=>Engine.update(),16);
