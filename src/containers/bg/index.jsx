import React, { Component } from "react";
import Particle from "./../../particle/index.jsx";

export default class Background extends Component {
    constructor(props) {
        super(props);
        this.updateCanvas = this.updateCanvas.bind(this);
        this.getRandom = this.getRandom.bind(this);
        this.init = this.init.bind(this);
        this.animation = this.animation.bind(this);
        this.particles = [];//all particle holder
        this.intervIds = [];//intervIds holder
        this.radius = 3;//particle radius
        this.maxAmount = 200;//particles' maxamount
        this.fps = 30; //refresh interval
        this.state = {

        }
    }

    init(ctx, canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < this.maxAmount; i++) {
            this.particles[i] = new Particle(this.radius, this.getRandom(0, window.innerWidth), this.getRandom(0, window.innerHeight), ctx);
            this.particles[i].init();
        }
        this.updateCanvas(ctx, canvas);
    }

    animation(canvas) {
        for (let i = 0; i < this.maxAmount; i++) {
            // this.particles[i].update(2);
            this.particles[i].update(Math.floor(Math.random() * 2) + 1, canvas);
            //update particle's position by 1 or 2 unit
        }
    }

    updateCanvas(ctx, canvas) {
        //refresh canvas every 'this.fps' seconds
        this.intervIds[0] = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.animation(canvas);
        }, this.fps);
    }

    getRandom(min, max) {
        return Math.random() * (max - min) + min;
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
            this.init(ctx, canvas);
        } else {
            alert('Canvas is not supported!');
        }
    }

    componentDidUpdate() {

    }

    render() {
        return (
            <canvas ref="canvas"></canvas>
        );
    }
}