import React, { Component } from "react";
import styled from "styled-components";
import sites from "./sites.jsx";

const CollectionsMainContainer = styled.div`
    width: 100%;
    height:100%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 17px;
    position: absolute;
    font-size: 2em;
    flex-flow: row wrap;
    text-align: center;
    margin: 0;
`;

const Title = styled.div`
    width: 100%;
    font-size: 1.55em;
    font-family: 'Lobster', cursive;
    font-weight: bold;
    margin: 100px 0;
`;

const Subtitle = styled.div`
    width: 100%;
    font-size: 1em;
    font-family: 'Lobster', cursive;
    margin: 50px 0;
`;

const ElementsContainer = styled.div`
    width: 100%;
    display: flex;
    align-content: flex-start;
    flex-flow: row wrap;
    justify-content: space-between;
    text-align: center;
    margin: 0 -10px;
`;

const Element = styled.div`
    min-width: 239px;
    height: 60px;
    flex-grow: 2;
    margin: 0 20px;
`;

const Link = styled.a`
    color: #000;
    font-family: 'Merriweather', serif;
    font-size: 0.65em;
`;

const Back = styled.a`
    display: block;
    position: absolute;
    right: 20px;
    top: 20px;
    color: #000;
    font-family: 'Merriweather', serif;
    font-size: 0.5em;
`;

export default class CollectionsMain extends Component {
    constructor(props) {
        super(props);
        this.catalogAmazinSites = this.catalogAmazinSites.bind(this);
        this.catalogFreeImage = this.catalogFreeImage.bind(this);
        this.catalogFreeFont = this.catalogFreeFont.bind(this);
        this.catalogCCSearch = this.catalogCCSearch.bind(this);
        this.state = {
            sites: sites
        }
    }

    catalogAmazinSites() {
        let tmp = this.state.sites[0];
        let list = tmp.data;

        return list.map(item=>{
            return <Element><Link href={item.url}>{item.name}</Link></Element>
        });
    }

    catalogFreeImage() {
        let tmp = this.state.sites[1];
        let list = tmp.data;
        
        return list.map(item => {
            return <Element><Link href={item.url}>{item.name}</Link></Element>
        });
    }

    catalogFreeFont() {
        let tmp = this.state.sites[2];
        let list = tmp.data;

        return list.map(item => {
            return <Element><Link href={item.url}>{item.name}</Link></Element>
        });
    }

    catalogCCSearch() {
        let tmp = this.state.sites[3];
        let list = tmp.data;

        return list.map(item => {
            return <Element><Link href={item.url}>{item.name}</Link></Element>
        });
    }

    render() {
        return (
            <CollectionsMainContainer>
                <Back href={'/'}>Home</Back>
                <Title>Collections</Title>
                <Subtitle>{this.state.sites[0].category}</Subtitle>
                <ElementsContainer>{this.catalogAmazinSites()}</ElementsContainer>
                <Subtitle>{this.state.sites[1].category}</Subtitle>
                <ElementsContainer>{this.catalogFreeImage()}</ElementsContainer>
                <Subtitle>{this.state.sites[2].category}</Subtitle>
                <ElementsContainer>{this.catalogFreeFont()}</ElementsContainer>
                <Subtitle>{this.state.sites[3].category}</Subtitle>
                <ElementsContainer>{this.catalogCCSearch()}</ElementsContainer>
            </CollectionsMainContainer>
        );
    }
}