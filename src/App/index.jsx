import React from "react";
import Section from "./Section";
import SidePanelContent from './SidePanel';
import styled from "styled-components";
import projectsData from "./projectsData"
import { lightColor, darkColor, secondaryDarkColor } from "./Config";

const Container = styled.div`
    width: 100%;
    height: auto;
    min-height: 100%;
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    background-color: ${secondaryDarkColor};

    @media (max-width: 768px) {
        flex-flow: column nowrap;
    }
`;

const SidePanel = styled.div`
    width: 20vw;
    height: 100%;
    position: fixed;
    left: 0;
    background-color: ${darkColor};
    font-family: 'Lobster', cursive;
    font-size: 2em;
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    align-items: center;
    border-right: 2px solid #ECF0F1;
    box-sizing: border-box;

    @media (max-width: 768px) {
        width: 100vw;
        height: 20vw;
        top: 0;
        flex-flow: row nowrap;
        border-right: 0px solid #ECF0F1;
        border-bottom: 1px solid #ECF0F1;
    }

    @media (max-width: 320px) {
        height: 30vw;
    }
`;

const SidePanelPlaceHolder = styled.div`
    flex: 1 1 20%;
    @media (max-width: 768px) {
        flex: 1 1 200px;
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
    color: ${lightColor};
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

