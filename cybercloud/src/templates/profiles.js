import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

class Profiles extends React.Component {
    render() {
        const { profiles } = this.props.pageContext;

        return <Container>
            <ProfilesWrapper>
                { profiles.map((profile, index) => {
                    return <ProfileBox key={ index }>
                        <Link to={`/profile/${ profile.login }`}>
                            <Avatar src={ profile.avatar_url } alt={ profile.name } />
                            <p>{ profile.name }</p>
                        </Link>
                    </ProfileBox>
                }) }
            </ProfilesWrapper>
        </Container>
    }
}

const Container = styled.div`
    padding: 20px;
`

const ProfilesWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 30px;
    grid-row-gap: 30px;
`

const ProfileBox = styled.div`
    background: grey;
    padding: 12px;
    border-radius: 5px;
    overflow: hidden;
`

const Avatar = styled.img`
    width: 120px;
    height: 120px;
`;

export default Profiles;