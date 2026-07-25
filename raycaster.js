const Raycaster={
    rays:[],

    prepareRays(){
        this.rays=[];

        for(let i=0;i<NUM_RAYS;i++){
            const cameraX=(2*i/NUM_RAYS)-1;

            const rayDirX=Player.dirX+Player.planeX*cameraX;
            const rayDirY=Player.dirY+Player.planeY*cameraX;

            this.rays.push({
                x:Player.x,
                y:Player.y,
                dirX:rayDirX,
                dirY:rayDirY
            });
        }
    }
};
