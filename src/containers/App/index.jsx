import React, { Component } from "react";
import styled from "styled-components";

const BackgroundCanvas = styled.canvas`
    width: 100%;
    height:100%;
    margin: 0;
    padding：0；
`;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.updateCanvas = this.updateCanvas.bind(this);
        this.state={

        }
    }

    updateCanvas() {
        const canvas = this.refs.canvas;
        if(canvas.getContext) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgb(200, 0, 0)';
            for(let i = 20; i>0; i=i-3) {
                ctx.fillRect(i,i,1,1);
            }
            // TODO: canvas is blurry
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
            <BackgroundCanvas ref="canvas"></BackgroundCanvas>
        );
    }
}

