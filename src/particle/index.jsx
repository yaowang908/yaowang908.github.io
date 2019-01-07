
export default class Particle {
    constructor(radius, x, y, ctx) {
        this.radius = radius;
        this.axisX = x;
        this.axisY = y;
        this.ctx = ctx;
        this.movingDirection = Math.floor(Math.random() * 360) + 1;
        this.color = this.getRandomColor();
        this.init = this.init.bind(this);
        this.draw = this.draw.bind(this);
        this.update = this.update.bind(this);
    }

    init() {
        this.draw();
    }

    getRandomColor() {
        // let h = 240;
        let h = Math.floor(Math.random() * 360);
        let s = Math.floor(Math.random() * 100);
        // let l = Math.floor(Math.random() * 50);
        let l = 80;
        let color = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
        //random blue color
        return color;
    }

    draw() {
        //draw a particle
        this.ctx.save();
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.axisX, this.axisY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.restore();
    }

    update(delta, canvas) {
        //thanks to @blindman67 https://stackoverflow.com/questions/54065819/canvas-bouncing-ball-randomly-passes-left-border
        let dx, dy, x, y;
        dx = delta * Math.cos(this.movingDirection * Math.PI / 180);
        dy = delta * Math.sin(this.movingDirection * Math.PI / 180);
        x = this.axisX += dx;
        y = this.axisY += dy;
        const r = this.radius;

        if (dx > 0) { // moving to the right
            if (x + r >= canvas.width) {
                x = canvas.width - r;
                dx = -dx;
            }
        } else if (dx < 0) { // moving to the left
            if (x - r <= 0) {
                x = r;
                dx = -dx;
            }
        }
        if (dy > 0) { // moving down
            if (y + r >= canvas.height) {
                y = canvas.height - r;
                dy = -dy;
            }
        } else if (dy < 0) { // moving up
            if (y - r <= 0) {
                y = r;
                dy = -dy;
            }
        }

        this.axisX = x;
        this.axisY = y;
        this.movingDirection = Math.atan2(dy, dx) * (180 / Math.PI);

        this.draw();
    }
}