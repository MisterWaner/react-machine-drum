import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();

    return (
        <Wrapper>
            <h1>Our super music app</h1>
            <nav>
                <Link to="/">
                    <MenuEl isCurrentPage={location.pathname === "/"}>
                        Home
                    </MenuEl>
                </Link>
                <Link to="/about">
                    <MenuEl isCurrentPage={location.pathname === "/about"}>
                        About
                    </MenuEl>
                </Link>
            </nav>
        </Wrapper>
    );
}

const Wrapper = styled.header`
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 24px;
    & nav {
        display: flex;
    }
    & a {
        text-decoration: none;
        color: inherit;
    }
    & a:first-child {
        margin-right: 16px;
    }
`;

const MenuEl = styled.p`
font-size: 18px;
padding-bottom: 2px;
border-bottom: 2px solid ${(props) => props.isCurrentPage ? "" : "transparent"};
transition: border linear 0.25s;
    &:hover {
        border-bottom: 2px solid;
    }
`;