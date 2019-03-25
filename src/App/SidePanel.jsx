import React, { Fragment } from 'react';
import styled from "styled-components";

const NameContainer = styled.div`
    width: 100%;
    padding: 0;
    margin: 150px 0 0 0;
    color: #fff;
`;

const Bio = styled.div`
    width: 100%;
`;

const Connections = styled.div`
    width: 100%;
    
`;

const SidePanelContent = ()=>{
    return (
        <Fragment>
            <NameContainer>Yao Wang</NameContainer>
            <Bio>Bio</Bio>
            <Connections>Connections</Connections>
        </Fragment> 
    );
};

export default SidePanelContent;