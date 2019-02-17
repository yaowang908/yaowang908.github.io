import React, { Component } from "react";
import Background from "./../bg/index.jsx";
import CollectionsMain from "./content/index.jsx";
import styled from "styled-components";

const Container = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 17px;
    width: 100%;
    height: 100%;
    position: relative;
`;

export default class Collections extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    render() {
        return (
            <Container>
                <CollectionsMain></CollectionsMain>
                <Background></Background>
            </Container>
        );
    }
}

