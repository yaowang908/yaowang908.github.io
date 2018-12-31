import React, { Component } from "react";
import styled from "styled-components";

class Particle {
    constructor(radius,x,y,ctx) {
        this.radius = radius;
        this.axisX = x;
        this.axisY = y;
        this.ctx = ctx;
        this.movingDirection = Math.floor(Math.random() * 360) +1;
        this.color = this.getRandomColor();
        this.init = this.init.bind(this);
        this.draw = this.draw.bind(this);
        this.update = this.update.bind(this);
    }

    init() {
        this.draw();
    }

    getRandomColor() {
        let h = 240;
        let s = Math.floor(Math.random() * 100);
        // let l = Math.floor(Math.random() * 50);
        let l = 80;
        let color = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
        //random blue color
        return color;
    }

    draw() {
        this.ctx.save();
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.axisX,this.axisY,this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.restore();
    }

    update(delta,canvas) {

        let deltaX = delta * Math.cos(this.movingDirection);
        let deltaY = delta * Math.sin(this.movingDirection);

        this.axisX += deltaX;
        this.axisY += deltaY;  

        if(axisX >= canvas.width) {
            
        }

        // this.axisX += deltaX;
        // this.axisY += deltaY;
        
        console.log(this.axisY);        
        this.draw();
    }
}


export default class App extends Component {
    constructor(props) {
        super(props);
        this.updateCanvas = this.updateCanvas.bind(this);
        this.getRandom = this.getRandom.bind(this);
        this.init = this.init.bind(this);
        this.animation = this.animation.bind(this);
        this.particles = [];
        this.intervIds = [];
        this.radius = 3;
        this.maxAmount = 50;
        this.fps = 100;
        this.state = {

        }
    }

    init(ctx, canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < this.maxAmount; i++) {
            this.particles[i] = new Particle(this.radius, this.getRandom(0, window.innerWidth), this.getRandom(0, window.innerHeight), ctx);
            this.particles[i].init();
        }
        this.updateCanvas(ctx,canvas);
    }

    animation(canvas) {
        for (let i = 0; i < this.maxAmount; i++) {
            // this.particles[i].update(2);
            this.particles[i].update(Math.floor(Math.random() * 10) + 1,canvas);
        }
    }

    updateCanvas(ctx,canvas) {
        this.intervIds[0] = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.animation(canvas);
        }, this.fps);
    }

    getRandom(min,max) {
        return Math.random()*(max-min)+min;
    }

    componentDidMount() {
        // https://blog.cloudboost.io/using-html5-canvas-with-react-ff7d93f5dc76
        const canvas = this.refs.canvas;
        if (canvas.getContext) {
            const ctx = canvas.getContext('2d');
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
            //resize to window size
            ctx.fillStyle = "#3370d4";
            this.init(ctx,canvas);
        } else {
            alert('Canvas is not supported!');
        }
    }

    componentDidUpdate() {
        
    }

    render(){
        return (
            <canvas ref="canvas"></canvas>
        );
    }
}

