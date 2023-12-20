import { Container } from "./Header.styles";
const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

export const Header = () => {
    return (
        <Container>
            <img src={process.env.PUBLIC_URL + `assets/logo.svg`} alt="" />
            <img src={process.env.PUBLIC_URL + `assets/menu.svg`} alt="" />
        </Container>
    );
};
