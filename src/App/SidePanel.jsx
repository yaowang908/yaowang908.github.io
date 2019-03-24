import React, { Fragment } from 'react';
import styled from "styled-components";

const NameContainer = styled.div`
    width: 100%;
    padding: 0;
    margin: 150px 0;
    font-family: 'Lobster', cursive;
    font-size: 2em;
    text-align: center;
    color: #fff;
`;

const SidePanelContent = ()=>{
    return (
        <Fragment>
            <NameContainer>Yao Wang</NameContainer>
        </Fragment> 
    );
};

export default SidePanelContent;