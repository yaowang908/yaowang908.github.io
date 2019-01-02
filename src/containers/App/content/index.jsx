import React, { Component } from "react";
import styled from "styled-components";

const MainContainer = styled.div`
    width: 600px;
    height: 200px;
    padding: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -300px;
    margin-top: -100px;
    z-index: 100;
`;

const NameContainer = styled.div`
    width: 100%;
    padding: 0;
    margin-bottom: 50px;
    font-family: 'Lobster', cursive;
    font-size: 2em;
    text-align: center;
`;

const EntriesContainer = styled.div`
    width: 100%;
    padding: 0;
    &: after {
        clear: both;
    }
`;

const Entry = styled.div`
    width: 200px;
    padding: 0;
    font-family: 'Merriweather', serif;
    font-size: 1.25em;
    text-align: center;
    float: left;
`;



export default class main extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        return (
            <MainContainer>
                <NameContainer>Yao Wang</NameContainer>
                <EntriesContainer>
                    <Entry>Collection</Entry>
                    <Entry>Projects</Entry>
                    <Entry>Design</Entry>
                </EntriesContainer>
            </MainContainer>
        );
    }
}