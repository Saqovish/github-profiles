import React from "react";
import styled, { css } from "styled-components";
import { Link } from "gatsby";
import * as d3 from "d3";

class Profile extends React.Component {
    componentDidMount() {
        // const p =  d3.selectAll("language")
        //     .data(this.props.pageContext.profile.languages)
        //     .enter()
        //     .append("p")
        //     .text((language) => {
        //         const [ key, value ] = Object.entries(language)[0];
        //         return `${ key }: ${ value }%`
        //     })
        // console.log(p);
        d3.select(".chart")
            .selectAll("div")
            .data(this.sortedLanguages(this.props.pageContext.profile.languages))
            .enter()
            .append("div")
            .style("width", (d) => {
                const [ key, value ] = Object.entries(d)[0];
                return `${ value }%`;
            })
            .text((d) => {
                const [ key, value ] = Object.entries(d)[0];
                return `${ value }%`;
            })
    }

    sortedLanguages = () => {
        const { languages } = this.props.pageContext.profile;
        const langs = [...languages];
        langs.sort((a, b) => {
            const keyA = Object.keys(a)[0];
            const keyB = Object.keys(b)[0];
            return b[keyB] - a[keyA];
        });
    
        console.log(langs.slice(0, 5));
        return langs.slice(0, 6);
    }

    render() {
        const { profile } = this.props.pageContext;
        const { avatar_url, login, name, blog, bio, public_repos, total_repos, followers, following, url, repos_url, languages, packages, devPackages } = profile;
        return <Container>
            <Link to="/profiles">Profiles</Link>
            <h1>{ login }</h1>
            <p><a href={ url } target="_blank">{ name }</a></p>
            <img src={ avatar_url } alt={ name } />
            <div className="chart"></div>
            <LanguagesWrapper>
                { this.sortedLanguages().map((language, index) => {
                    const [ key, value ] = Object.entries(language)[0];
                    return <LanguageBar className="language" key={ index }>
                        <Value>{ value }%</Value>
                        <Bar height={ value }>
                            <Color />
                        </Bar>
                        <Label>{ key }</Label>
                    </LanguageBar>
                }) }
            </LanguagesWrapper>
        </Container>
    }
}

const Container = styled.div`
    a {
        color: black;
    }

    .chart div {
        font: 10px sans-serif;
        background-color: steelblue;
        text-align: right;
        padding: 3px;
        margin: 1px;
        color: black;
        font-weight: bold;
    }
`;

const LanguagesWrapper = styled.div`
    display: flex;
    align-items: flex-end;
`

const LanguageBar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    postion: relative;
`

const Bar = styled.div`
    width: 50px;
    ${ props => css`height: ${ props.height }px;`}
`

const Color = styled.div`
    width: 100%;
    animation-name: buildUp;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    transition: 0.5s all ease;
    background: grey;

    @keyframes buildUp {
        0% {
            height: 0px;
        }

        100% {
            height: 100%;
        }
    }
`

const Value = styled.p`
    font-size: 10px;
    font-weight: bold;
`

const Label = styled.p`
    font-size: 12px;
    font-weight: bold;
    text-align: center;
`

export default Profile;