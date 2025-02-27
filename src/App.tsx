import React, { Dispatch, SetStateAction, useState } from 'react';
import { GlobalStyles } from './styles/globalStyles';
import styled, { ThemeProvider } from "styled-components";
import { MyRoutes } from "./routers/routers"; 
import { BrowserRouter } from 'react-router-dom';
import { Dark, Light } from './styles/Themes';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';

type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: Dispatch<SetStateAction<ThemeType>>;
}


export const ThemeContext = React.createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {}, 
});



function App() {
  const [theme, setTheme] = useState<ThemeType>("light");
  const themeStyle = theme === "light" ? Light : Dark;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={themeStyle}>
        <BrowserRouter>
          <GlobalStyles />
          <Topbar/>
          <Container className = {sidebarOpen? "sidebarState active" : ""}>
              <Sidebar 
              sidebarOpen = {sidebarOpen} 
              setSidebarOpen = {setSidebarOpen}/>
            <MyRoutes/>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 90px auto;
    background: ${(props) => props.theme.body};;
    transition: all 0.3s;
    &.active {
      grid-template-columns: 250px auto;
  }
`;

export default App;