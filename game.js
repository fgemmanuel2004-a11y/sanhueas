// game.js

const Game = {
    canvas: null,
    ctx: null,

    width: 0,
    height: 0,

    running: false,
    lastTime: 0,
    delta: 0,

    fps: 0,
    frameCounter: 0,
    fpsTimer: 0,

    state: "menu",

    init() {
        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");

        this.resize();

        window.addEventListener("resize", () => this.resize());

        this.running = true;

        requestAnimationFrame((t) => this.loop(t));
    },

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.canvas.width = this.width;
        this.canvas.height = this.height;
    },

    loop(time) {
        if (!this.running) return;

        this.delta = (time - this.lastTime) / 1000;
        this.lastTime = time;

        this.update(this.delta);
        this.render();

        requestAnimationFrame((t) => this.loop(t));
    },

    update(dt) {

        this.frameCounter++;
        this.fpsTimer += dt;

        if (this.fpsTimer >= 1) {
            this.fps = this.frameCounter;
            this.frameCounter = 0;
            this.fpsTimer = 0;

            const fps = document.getElementById("fps");
            if (fps) fps.textContent = this.fps;
        }

        // Próximos módulos:
        // Player.update(dt);
        // Physics.update(dt);
        // Raycaster.update(dt);
        // EnemyManager.update(dt);
    },

    render() {

        const ctx = this.ctx;

        ctx.clearRect(0,0,this.width,this.height);

        // Cielo
        ctx.fillStyle = "#4c6fa9";
        ctx.fillRect(0,0,this.width,this.height/2);

        // Piso
        ctx.fillStyle = "#2f2f2f";
        ctx.fillRect(0,this.height/2,this.width,this.height/2);

        // Punto de mira
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(this.width/2-10,this.height/2);
        ctx.lineTo(this.width/2+10,this.height/2);

        ctx.moveTo(this.width/2,this.height/2-10);
        ctx.lineTo(this.width/2,this.height/2+10);
        ctx.stroke();
    }
};

window.addEventListener("load",()=>Game.init());
