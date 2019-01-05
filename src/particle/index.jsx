
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


        let deltaX = delta * Math.cos(this.movingDirection * Math.PI / 180);
        let deltaY = delta * Math.sin(this.movingDirection * Math.PI / 180);

        this.axisX += deltaX;
        this.axisY += deltaY;
        
        //set border
        if (this.axisX > (canvas.width)) {
            if (this.movingDirection > 270 && this.movingDirection < 360) {
                this.movingDirection = 180 + this.movingDirection;
            } else if (this.movingDirection < 90 && this.movingDirection > 0) {
                this.movingDirection = 180 - this.movingDirection;
            }
        }
        if (this.axisX < 0) {
            if (this.movingDirection > 180 && this.movingDirection < 270) {
                this.movingDirection = 540 - this.movingDirection;
            } else if (this.movingDirection <= 180 && this.movingDirection > 90) {
                this.movingDirection = 180 - this.movingDirection;
            }
        }

        if (this.axisY > (canvas.height) || this.axisY < 0) {
            if (this.movingDirection > 180 ) {
                this.movingDirection = 360 - this.movingDirection;
            } else if (this.movingDirection <= 180) {
                this.movingDirection = 360 - this.movingDirection;
            }
        }


        this.draw();
    }
}