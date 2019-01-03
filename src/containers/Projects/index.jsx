import React, { Component } from "react";
import Background from "./../bg/index.jsx";
import ProjectsMain from "./content/index.jsx";

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
            <div style={{ 'width': '100%', 'height': '100%', 'position': 'relative' }}>
                <ProjectsMain></ProjectsMain>
                <Background></Background>
            </div>
        );
    }
}

