import React from "react";
import Section from "./Section";
import SidePanelContent from './SidePanel';
import styled from "styled-components";
import projectsData from "./projectsData"

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-flow: row nowrap;
`;

const SidePanel = styled.div`
    width: 20vw;
    height: 100%;
    position: fixed;
    left: 0;
    background-color: #224d93;
`;

const SidePanelPlaceHolder = styled.div`
    flex: 1 1 20%;
`;

const MainPlaceHolder = styled.div`
    flex: 1 1 80%;
    display: flex;
    flex-flow: column nowrap;
`;


const TitleContainer = styled.div`
    width: 100%;
    padding: 0;
    margin: 30px 0;
    font-family: 'Lobster', cursive;
    font-size: 2rem;
    text-align: center;
    color: #000;
`;

const App = ()=>{
    return (
        <Container>
            <SidePanel>
                <SidePanelContent />
            </SidePanel>
            <SidePanelPlaceHolder></SidePanelPlaceHolder>
            <MainPlaceHolder>
                <TitleContainer>My Work</TitleContainer>
                <Section lists={projectsData}></Section>
            </MainPlaceHolder>
        </Container>
       
    );
};
export default App;

