import React, { Component } from "react";
import styled from "styled-components";
import Items from "./items.jsx";

const ProjectsMainContainer = styled.div`
    width: 100%;
    height:100%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 17px;
    position: absolute;
    font-size: 2em;
    flex-flow: row wrap;
    text-align: center;
    margin: 0;
`;

const Title = styled.div`
    width: 100%;
    font-size: 1.55em;
    font-family: 'Lobster', cursive;
    font-weight: bold;
    margin: 100px 0;
`;


const Back = styled.a`
    display: block;
    position: absolute;
    right: 20px;
    top: 20px;
    color: #000;
    font-family: 'Merriweather', serif;
    font-size: 0.5em;
`;

export default class ProjectsMain extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <ProjectsMainContainer>
                <Back href={'/'}>Home</Back>
                <Title>Projects</Title>
                <Items></Items>
            </ProjectsMainContainer>
        );
    }
}