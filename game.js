function update(deltaTime){
    updateCamera();
    Raycaster.castAll();
}

function render(){
    Renderer.clear();

    if(typeof ctx!=="undefined"){
        ctx.fillStyle="#00FF00";
        ctx.font="14px monospace";
        ctx.fillText("Rayos preparados: "+Raycaster.rays.length,10,20);
    }
}
