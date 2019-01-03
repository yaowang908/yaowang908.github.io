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
    font-size: 3em;
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

const Link = styled.a`
    color: #000;
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
                    <Entry><Link href="/collections.html">Collection</Link></Entry>
                    <Entry><Link href="/projects.html">Projects</Link></Entry>
                    <Entry><Link href="https://www.behance.net/yaowang9">Design</Link></Entry>
                </EntriesContainer>
            </MainContainer>
        );
    }
}