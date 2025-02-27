// Topbar.tsx
import styled from "styled-components";
import { AiOutlineSearch, AiOutlineBell, AiOutlineUser } from "react-icons/ai";
import { v } from "../styles/Variables";

export function Topbar() {
  return (
    <Container>
      {/* Logo o Nombre de la Aplicación */}
      <Logo>E-Restaurant</Logo>

      {/* Barra de Búsqueda */}
      <SearchBar>
        <AiOutlineSearch />
        <input type="text" placeholder="Buscar..." />
      </SearchBar>

      {/* Sección derecha: iconos o botones importantes */}
      <RightSection>
        <IconContainer>
          <AiOutlineBell />
        </IconContainer>
        <IconContainer>
          <AiOutlineUser />
        </IconContainer>
      </RightSection>
    </Container>
  );
}

// Estilos con styled-components
const Container = styled.div`
  height: 60px;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${v.lgSpacing};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil */
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.body};
  border-radius: 4px;
  padding: 0 10px;
  color: ${({ theme }) => theme.text};

  svg {
    font-size: 1.2rem;
    margin-right: 8px;
  }

  input {
    border: none;
    outline: none;
    background: transparent;
    color: ${({ theme }) => theme.text};
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  margin-left: ${v.mdSpacing};
  cursor: pointer;

  svg {
    font-size: 1.5rem;
  }

  &:hover {
    color: ${({ theme }) => theme.secondary};
  }
`;
