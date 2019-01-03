import React, { Component } from "react";
import styled from "styled-components";

const CollectionsMainContainer = styled.div`
    position: absolute;
`;

export default class CollectionsMain extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <CollectionsMainContainer>
                <h2>Collection Main</h2>
            </CollectionsMainContainer>
        );
    }
}