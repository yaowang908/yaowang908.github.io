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

    @media (max-width: 768px) {
        flex-flow: column nowrap;
    }
`;

const SidePanel = styled.div`
    width: 20vw;
    height: 100%;
    position: fixed;
    left: 0;
    background-color: #224d93;
    font-family: 'Lobster', cursive;
    font-size: 2em;
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    align-items: center;

    @media (max-width: 768px) {
        width: 100vw;
        height: 20vw;
        top: 0;
        flex-flow: row nowrap;
    }

    @media (max-width: 320px) {
        height: 30vw;
    }
`;

const SidePanelPlaceHolder = styled.div`
    flex: 1 1 20%;
    @media (max-width: 768px) {
        flex: 1 1 25vw;
    }
    @media (max-width: 320px) {
        flex: 1 1 40vw;
    }
`;

const MainPlaceHolder = styled.div`
    flex: 1 1 80%;
    display: flex;
    flex-flow: column nowrap;
    @media (max-width: 768px) {
        flex: 1 1 auto;
    }
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

