import React, { Component, Fragment } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: auto;
    text-align: center;
`;

export default class Items extends Component {
    constructor(props) {
        super(props);
        this.state={
            content : [
                {
                    href: "https://www.yaow.me/CE-Mindmap/dist/",
                    name: "Mind Mapping Project"
                },
                {
                    href: "https://www.yaow.me/neighborhood-project/dist/",
                    name: "Neighborhood Map Project"
                },
                {
                    href: "https://www.yaow.me/us-states-map-popup/usmap.html",
                    name: "US Map Project"
                }
            ]
        };
    }

    render(){
        return(
            <Container>
                {/* <h2>Coming Soon...</h2> */}
                {this.state.content.map(x=>{
                    return <Item href={x.href} name={x.name}></Item>;
                })}
            </Container>
        );
    }
}

const ItemHolder = styled.div`
    width: 100%;
    height: 200px;
    line-height: 200px;
    font-size: 0.8em;
    text-align: center;
    margin: 40px 0;
    background-color: rgba(46,62,89,0.2);
`;

const Link = styled.a`
    color: #000;
`;

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <ItemHolder>
                <Link href={this.props.href}>{this.props.name}</Link>
            </ItemHolder>
        );
    }
}