import React, { Component } from "react";
import styled from "styled-components";

class Particle {
    constructor(radius,x,y) {
        this.radius = radius;
        this.axisX = x;
        this.axisY = y;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

}


export default class App extends Component {
    constructor(props) {
        super(props);
        this.updateCanvas = this.updateCanvas.bind(this);
        this.state={

        }
    }

    updateCanvas() {
        const canvas = document.getElementById("canvas");
        if(canvas.getContext) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle="#3370d4";
            let particle_1 = new Particle(10,20,20);
            particle_1.draw(ctx);
            //TODO: particle is not showing
        } else {
            alert ('Canvas is not supported!');
        }
    }

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate() {
        this.updateCanvas();
    }


    render(){
        return (
            <canvas id="canvas" width={1200} height={1200} ></canvas>
        );
    }
}

