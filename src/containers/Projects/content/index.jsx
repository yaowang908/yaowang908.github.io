import React, { Component } from "react";
import styled from "styled-components";

const ProjectsMainContainer = styled.div`
    position: absolute;
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
                <h2>Projects Main</h2>
            </ProjectsMainContainer>
        );
    }
}