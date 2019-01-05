import React, { Component } from "react";
import Particle from "./../../particle/index.jsx";

export default class Background extends Component {
    constructor(props) {
        super(props);
        this.updateCanvas = this.updateCanvas.bind(this);
        this.getRandom = this.getRandom.bind(this);
        this.init = this.init.bind(this);
        this.animation = this.animation.bind(this);
        this._onClick = this._onClick.bind(this);
        this.movingSpeed = 2;
        this.particles = [];//all particle holder
        this.intervIds;//intervIds holder
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
            this.particles[i].update(Math.floor(Math.random() * this.movingSpeed) + 1, canvas);
            //update particle's position by 1 or 2 unit
        }
    }

    updateCanvas(ctx, canvas) {
        clearInterval(this.intervIds);
        //refresh canvas every 'this.fps' seconds
        this.intervIds = setInterval(() => {
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
            this.init(ctx, canvas);
        } else {
            alert('Canvas is not supported!');
        }

        window.onresize = function () {
            let NewCanvas = this.refs.canvas;
            if (NewCanvas.getContext) {
                let NewCtx = NewCanvas.getContext('2d');
                NewCtx.canvas.width = window.innerWidth;
                NewCtx.canvas.height = window.innerHeight;
                //resize to window size
                this.init(NewCtx, NewCanvas);
            } else {
                alert('Canvas is not supported!');
            }
        }.bind(this)
    }

    _onClick(e) {
        // console.log(e.screenX,e.screenY);
        // console.log(e.clientX,e.clientY);
        let canvas = this.refs.canvas;
        if(this.movingSpeed < 15) {
            this.movingSpeed++;
        } else {
            this.movingSpeed = 2;
        }
        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');
            for (let i = 0; i < this.maxAmount; i++) {

                let pX = this.particles[i].axisX;
                let pY = this.particles[i].axisY;
                if (e.clientX < pX) {
                    //if angle greater than 180, use trgonometric function induction formula
                    this.particles[i].movingDirection = 180 + Math.atan((e.clientY - pY) / (e.clientX - pX)) * 180 / Math.PI;
                } else {
                    this.particles[i].movingDirection = Math.atan((e.clientY - pY) / (e.clientX-pX))*180/Math.PI;
                }
                
                // this.particles[i].update(Math.floor(Math.random() * this.movingSpeed) + this.movingSpeed - 1, canvas);
                this.particles[i].fps = 5;
                this.particles[i].update(this.movingSpeed - 1, canvas);
                //update particle's position by 1 or 2 unit
            }
        } else {
            alert('Canvas is not supported!');
        }
    }

    componentDidUpdate() {
        
    }

    render() {
        return (
            <canvas ref="canvas" onClick={this._onClick}></canvas>
        );
    }
}