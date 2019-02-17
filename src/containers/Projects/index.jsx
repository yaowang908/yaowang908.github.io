import React, { Component } from "react";
import Background from "./../bg/index.jsx";
import ProjectsMain from "./content/index.jsx";
import styled from "styled-components";

const Container = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 17px;
    box-size: content-box;
    width: 100%;
    height: 100%;
    position: relative;
`;

export default class Projects extends Component {
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
                <ProjectsMain></ProjectsMain>
                <Background></Background>
            </Container>
        );
    }
}

