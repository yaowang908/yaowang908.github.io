import React, { Component } from "react";
import Background from "./../bg/index.jsx";
import CollectionsMain from "./content/index.jsx";

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
            <div style={{ 'width': '100%', 'height': '100%', 'position': 'relative' }}>
                <CollectionsMain></CollectionsMain>
                <Background></Background>
            </div>
        );
    }
}

