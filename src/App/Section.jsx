import React from 'react';
import styled from 'styled-components';

const SectionContainer = styled.div`
    margin: 0 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px,1fr));
    grid-gap: 1rem;
    align-content: start;
`;

const Block = styled.div`
    border: 1px solid #224d93;
    box-sizing: border-box;

    a {
        display: table;
        width: 100%;
        height: 100%;
        text-align: center;
        text-decoration: none;
        position: relative;
        color: rgb(34,77,147);
        
        img {
            width: 100%;
            height: 100%;
        }

        span {
            position: absolute;
            display: block;
            bottom: 0;
            padding: 5px 0;
            box-sizing: border-box;
            background: rgba(255,255,255,0.5);
            width: 100%
            font-size: 1.5rem;
            font-family: 'Lobster', cursive;
        }
    }
`;

const Section = (props)=>{
    return (
        <SectionContainer>
            {
                props.lists.map((x)=>{
                    if(x.externalLink) {
                        return (
                            <Block>
                                <a href={x.link}>
                                    <span>{x.name}</span>
                                    <img src={x.imgUrl} alt={x.name}/>
                                </a>
                            </Block>
                        );
                    } else {
                        return (
                            <Block>
                                <a href={x.link}>
                                    <span>internalLink</span>
                                    <span>{x.name}</span>
                                    <img src={x.imgUrl} alt={x.name} />
                                </a>
                            </Block>
                        );
                    }
                    
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