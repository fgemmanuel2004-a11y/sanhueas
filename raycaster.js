const Raycaster={
    rays:[],

    castAll(){
        this.rays=[];

        for(let x=0;x<NUM_RAYS;x++){

            const cameraX=(2*x/NUM_RAYS)-1;

            const rayDirX=Player.dirX+Player.planeX*cameraX;
            const rayDirY=Player.dirY+Player.planeY*cameraX;

            let mapX=Math.floor(Player.x);
            let mapY=Math.floor(Player.y);

            const deltaDistX=Math.abs(1/(rayDirX||0.00001));
            const deltaDistY=Math.abs(1/(rayDirY||0.00001));

            this.rays.push({
                mapX,
                mapY,
                rayDirX,
                rayDirY,
                deltaDistX,
                deltaDistY
            });
        }
    }
};
