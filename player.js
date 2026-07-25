const Player={
    x:3.5,
    y:3.5,
    angle:0,
    fov:Math.PI/3,
    moveSpeed:3.5,
    rotSpeed:Math.PI,
    radius:0.2,

    dirX:Math.cos(0),
    dirY:Math.sin(0),

    planeX:0,
    planeY:0
};

function updateCamera(){
    Player.dirX=Math.cos(Player.angle);
    Player.dirY=Math.sin(Player.angle);

    const planeLength=Math.tan(Player.fov/2);

    Player.planeX=-Player.dirY*planeLength;
    Player.planeY= Player.dirX*planeLength;
}
