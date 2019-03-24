import React from 'react';
import styled from 'styled-components';

const SectionContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 30px;
    justify-content: space-between;
    align-content: flex-start;
`;

const Block = styled.div`
    flex: 0 1 300px;
    border: 1px solid #224d93;
    box-sizing: border-box;
    margin-bottom: 30px;
    background-color: ${props => props.color ? props.color : '#fff'};
    background-image: ${props => props.imgUrl ? 'url('+props.imgUrl+')' : 'rgb(34,77,147)'};

    a {
        display: table;
        width: 100%;
        height: 100%;
        text-align: center;
        color: rgb(34,77,147);
        text-decoration: none;
        position: relative;
        
        img {
            width: 100%;
            height: 100%;
        }

        span {
            position: absolute;
            display: block;
            bottom: 0;
            padding: 5px 0;
            background: rgba(255,255,255,0.5);
            width: 100%
            font-size: 1.5rem;
            font-family: 'Lobster', cursive;
        }
    }

    &:before {
        content: '';
        float: left;
        padding-top: 100%;
    }
`;

const Section = (props)=>{
    return (
        <SectionContainer>
            {
                props.lists.map((x)=>{
                    return (
                            <Block>
                                <a href={x.link}>
                                    <span>{x.name}</span>
                                    <img src={x.imgUrl} alt={x.name}/>
                                </a>
                            </Block>
                        );
                })
            }
        </SectionContainer>
    );
}

// Section.propTypes = {
//     lists: PropTypes.arrayof(
//         PropTypes.shape({
//             name: PropTypes.string.isRequired,
//             link: PropTypes.string,
//             imgUrl: PropTypes.string,
//             color: PropTypes.string,
//         })
//     ),
// }

export default Section;