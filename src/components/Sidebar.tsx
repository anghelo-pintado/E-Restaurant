import styled from "styled-components";
import logo from "../assets/react.svg";
import { v } from "../styles/Variables";
import {
  AiOutlineHome,
  AiOutlineBarChart,
  AiOutlineShoppingCart,
  AiOutlinePieChart,
  AiOutlineFileText,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineLeft,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";

interface ContainerProps {
  isOpen: boolean;
}

export type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
    <Container isOpen={sidebarOpen}>
      <button
        className="SidebarButton"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <AiOutlineLeft />
      </button>

      <div className="LogoContent">
        <div className="ImgContent">
          <img src={logo} alt="logo" />
        </div>
        <h2>E-R</h2>
      </div>

      {linksArray.map(({ label, icon, to }) => (
        <div className="LinkContainer" key={label}>
          <NavLink
            to={to}
            className={({ isActive }) => `Links${isActive ? " active" : ""}`}
          >
            <div className="LinkIcon">{icon}</div>
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        </div>
      ))}

      <Divider />

      {secondaryLinksArray.map(({ label, icon, to }) => (
        <div className="LinkContainer" key={label}>
          <NavLink
            to={to}
            className={({ isActive }) => `Links${isActive ? " active" : ""}`}
          >
            <div className="LinkIcon">{icon}</div>
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        </div>
      ))}

      <Divider />
    </Container>
  );
}

//#region Data links
const linksArray = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
    to: "/",
  },
  {
    label: "Estadísticas",
    icon: <AiOutlineBarChart />,
    to: "/caja",
  },
  {
    label: "Productos",
    icon: <AiOutlineShoppingCart />,
    to: "/productos",
  },
  {
    label: "Diagramas",
    icon: <AiOutlinePieChart />,
    to: "/diagramas",
  },
  {
    label: "Reportes",
    icon: <AiOutlineFileText />,
    to: "/reportes",
  },
];
//#endregion

//#region Data links
const secondaryLinksArray = [
  {
    label: "Configuración",
    icon: <AiOutlineSetting />,
    to: "/configuracion",
  },
  {
    label: "Salir",
    icon: <AiOutlineLogout />,
    to: "/salir",
  },
];
//#endregion

//#region STYLED COMPONENTS
const Container = styled.div<ContainerProps>`
  background: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.text};
  position: sticky;
  border: 3px solid #EBEDEC;
  top: 0; /* Asegúrate de que el sidebar permanezca fijo en la parte superior */
  height: 100vh; /* Para ocupar toda la altura si así lo deseas */
  transition: width 0.3s ease;
  padding-top: 20px;

  .SidebarButton {
    position: absolute;
    top: ${v.xxlSpacing};
    right: -18px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${(props) => props.theme.bgtgderecha};
    box-shadow: 0 0 4px ${(props) => props.theme.gray400},
      0 0 7px ${(props) => props.theme.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    transform: ${({ isOpen }) => (isOpen ? `initial` : `rotate(180deg)`)};
    border: none;
    letter-spacing: inherit;
    color: inherit;
    font-size: inherit;
    text-align: inherit;
    padding: 0;
    font-family: inherit;
    outline: none;
  }

  .LogoContent {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: ${v.lgSpacing};

    .ImgContent {
      display: flex;
      img {
        max-width: 100%;
        height: auto;
      }
      cursor: pointer;
      transition: all 0.3s;
      transform: ${({ isOpen }) => (isOpen ? "scale(0.7)" : "scale(1.5)")};
    }

    h2 {
      display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    }
  }

  .LinkContainer {
    margin: 8px 0;
    padding: 0 15%;
    :hover {
      background: ${({ theme }) => theme.body};
    }

    .Links {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: calc(${v.smSpacing} - 2px) 0;
      color: ${(props) => props.theme.text};

      .LinkIcon {
        padding: ${v.smSpacing} ${v.mdSpacing};
        display: flex;
        svg {
          font-size: 25px;
        }
      }

      &.active {
        .LinkIcon {
          svg {
            color: ${(props) => props.theme.highlight};
          }
        }
      }
    }
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${(props) => props.theme.gray300};
  margin: ${v.lgSpacing} 0;
`;
//#endregion
