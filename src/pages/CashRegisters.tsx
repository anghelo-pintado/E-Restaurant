import styled from "styled-components"
import { Head } from "../components/Head";
import { v } from "../styles/Variables";
import { CashRegister } from "../components/CashRegister";

export function CashRegisters() {  
    return(
        <Container>
            <Head title = "Gestión de Cajas"/>
            <Divider/>
            <div className= "CashRegisters">
                <CashRegister title={"Principal"} description={"Sede Principal"} id={"1"}/>
                <CashRegister title={"Vip"} description={"Sede Principal"} id={"2"}/>
            </div>
        </Container>
    );
}

const Container = styled.div`
    padding: 5px 0 0 30px;

    .Divisor {
        width: 1288px;
        height: 0px;
        flex-shrink: 0;
        stroke-width: 2px;
        stroke: #F4F4F4;
    }

    .CashRegisters {
        display: flex;          /* Cambiamos a flex */
        flex-wrap: wrap;        /* Permite que los ítems salten a la siguiente línea */
        gap: 1rem;              /* Espacio entre los ítems */
        justify-content: center; /* Centra los ítems horizontalmente (opcional) */
    }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${(props) => props.theme.gray500};
  margin: ${v.lgSpacing} 0;
`;