import styled from "styled-components"
import { Head } from "../components/Head";
import { v } from "../styles/Variables";
import { ReportContainer } from "../components/ReportContainer";

export function Reports() {  
    return(
        <Container>
            <Head title = "Generar Reportes"/>
            <Divider/>

            <ReportContainer title={"Lista de Reportes"} description={"Todos los reportes en un solo lugar."} size={1390}/>

            <div className = "Reports">
                <ReportContainer title={"Reportes Totales"} description={"Resumen de todas la ventas."} size={452}/>
                <ReportContainer title={"Reportes Créditos"} description={"Historial de ventas a crédito."} size={452}/>
                <ReportContainer title={"Movimiento de Caja"} description={"Resumen de los movimientos de caja."} size={452}/>
                <ReportContainer title={"Reportes Contabilidad"} description={"Resumen de comprobantes de pago."} size={452}/>
                <ReportContainer title={"Reporte de Precuentas"} description={"Resumen de facturación antes del cierre."} size={452}/>
                <ReportContainer title={"Reportes Almacén"} description={"Resumen del inventario disponible."} size={452}/>
            </div>
        </Container>
    );
}

const Container = styled.div`
    padding: 5px 0 0 30px; 
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    .Reports {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }
    
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${(props) => props.theme.gray500};
  margin: ${v.lgSpacing} 0;
`;

