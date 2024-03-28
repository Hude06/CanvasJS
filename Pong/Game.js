import { Rect } from "./Utils.js";
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let currentKey = new Map();

class AI {
    constructor() {
        this.bounds = new Rect(1475, 10, 10, 150);
    }

    draw() {
        ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    }

    update() {
        if (ball.bounds.y >= this.bounds.y - 50) {
            this.bounds.y += 1;
        }
        if (ball.bounds.y <= this.bounds.y + 50) {
            this.bounds.y -= 1;
        }
    }
}

class Paddle {
    constructor() {
        this.bounds = new Rect(10, canvas.height / 2 - 75, 10, 150);
    }

    update() {
        if (currentKey.get("w")) {
            this.bounds.y -= 2;
        }
        if (currentKey.get("s")) {
            this.bounds.y += 2;
        }
    }

    draw() {
        ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    }
}

class Ball {
    constructor() {
        this.bounds = new Rect(200, 200, 10, 10);
        this.spin = 2;
        this.YSpin = 1;
    }

    draw() {
        ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    }

    update() {
        this.bounds.y += this.YSpin;
        this.bounds.x -= this.spin;
        if (this.bounds.intersects(playerOne.bounds) || playerOne.bounds.intersects(this.bounds)) {
            this.spin *= -1;
        }
        if (this.bounds.intersects(ai.bounds) || ai.bounds.intersects(this.bounds)) {
            this.spin *= -1;
        }
        if (this.bounds.y >= 550) {
            this.YSpin = -2;
        }
        if (this.bounds.y <= 0) {
            this.YSpin = 2;
        }
    }
}

let ball = new Ball();
let ai = new AI();
let playerOne = new Paddle();

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playerOne.draw();
    ball.draw();
    ball.update();
    playerOne.update();
    ai.draw();
    ai.update();
    requestAnimationFrame(loop);
}

keyboardInit();
loop();

function keyboardInit() {
    window.addEventListener("keydown", function (event) {
        currentKey.set(event.key, true);
    });
    window.addEventListener("keyup", function (event) {
        currentKey.set(event.key, false);
    });
}
