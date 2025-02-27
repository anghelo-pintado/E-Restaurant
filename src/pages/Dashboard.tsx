import styled from "styled-components"
import { v } from "../styles/Variables";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaMoneyBillAlt, FaShoppingBag, FaCalculator } from "react-icons/fa";
import { FiArrowLeft, FiCalendar, FiCheck, FiDownload, FiFilter, FiPrinter, FiX } from "react-icons/fi";
import { GiHazardSign } from "react-icons/gi";
import { MdFax } from "react-icons/md";
import { Head } from "../components/Head";
import { Card } from "../components/Card";
import { SalesSummary } from "../components/SalesSummary";
import { ClientsChart } from "../components/ClientsChart";
import { CashReconciliation } from "../components/CashReconciliation";
import { CustomButton } from "../components/CustomButton";

export const Dashboard = () => {
  const { id } = useParams();
  const location = useLocation();
  const { pettyCash: initialPettyCash } = location.state || {};
  const [pettyCash, setPettyCash] = useState(initialPettyCash || "");
  const { title: initialTitle } = location.state || {};
  const [title, setTitle] = useState(initialTitle || "");
  const [isCajaInUse, setIsCajaInUse] = useState(true);

  const handleCloseCashRegister = () => {
    if (id) {
      localStorage.removeItem(`pettyCash_${id}`);
      localStorage.removeItem(`title_${id}`);
    }
    setPettyCash("");  // Limpia el monto de caja chica
    window.history.back();
  };
  
  useEffect(() => {
    if (id) {
      // Recupera el valor guardado usando la llave única.
      const savedPettyCash = localStorage.getItem(`pettyCash_${id}`);
      const savedTitle = localStorage.getItem(`title_${id}`);
      if (savedPettyCash && savedTitle) {
        setPettyCash(savedPettyCash);
        setTitle(savedTitle);
      }
    }
  }, [id]);

  return (
    <Container>
      <div className = "Header">
          <div className="HeaderLeft">
          <button className="BackButton" onClick={() => window.history.back()}>
            <FiArrowLeft size={40} />
          </button>
          <Head title={"Caja " + title}/>
        </div>
        <div className="HeaderActions">
          <button 
            className={`CajaStatus ${isCajaInUse ? 'active' : ''}`}
            onClick={() => setIsCajaInUse(!isCajaInUse)}
          >
            {isCajaInUse ? 'Caja en uso' : 'Usar caja'}
          </button>

          <button className="ActionButton">
            <FiCalendar size = {24} color="#919598" />
            <span>Últimos 7 días</span>
          </button>

          <button className="ActionButton">
            <FiFilter size = {24} color="#919598" />
            <span>Filtro</span>
          </button>

          <button className="ActionButton">
            <FiDownload size = {24} color="#919598" />
            <span>Exportar</span>
          </button>
        </div>
      </div>
      <Divider />
      
      <div className="Cards">
        <Card icon={MdFax} percentage={15.40} value={pettyCash} name={"Caja Chica"}/>
        <Card icon={FaMoneyBillAlt} percentage={-2.03} value={1200} name={"Ingresos Totales"}/>
        <Card icon={FaShoppingBag} percentage={1.20} value={200} name={"Egresos Totales"}/>
        <Card icon={FaCalculator} percentage={2.40} value={1300} name={"Dinero Contado"}/>
        <Card icon={GiHazardSign} percentage={10} value={-200} name={"Diferencia"}/>
      </div>

      <div className= "Sales_Clients">
        <SalesSummary totalSales={2000000} percentageChange={12} invoiceAmount={50} ticketAmount={60} canceledSales={0}/>
        <ClientsChart data={[
                { name: "Lunes", value: 420 },
                { name: "Martes", value: 380 },
                { name: "Miércoles", value: 550},
                { name: "Jueves", value: 480 },
                { name: "Viernes", value: 510 },
                { name: "Sábado", value: 390 },
                { name: "Domingo", value: 280 },
              ]} filter={"daily"} totalClients={1000} percentageChange={6}/>
      </div>

      <div className = "FinalDashboard">
        <CashReconciliation systemMoney={pettyCash}/>
        <div className = "Buttons">
          <CustomButton 
              icon={FiCheck} 
              name="Guardar Cuadre" 
              color="#28A745"
          />
          <CustomButton 
              icon={FiPrinter} 
              name="Imprimir Ticket" 
              color="#FFC107"
          />
          <CustomButton 
              icon={FiX} 
              name="Cerrar Caja" 
              color="#DC3545"
              onClick={handleCloseCashRegister}
          />
        </div>
      </div>
    </Container>
  );
};


const Container = styled.div`
  padding: 5px 0 0 30px;
  display: flex;          
  flex-wrap: wrap;     
  gap: 1rem; 


  .Divisor {
    width: 1288px;
    height: 0px;
    flex-shrink: 0;
    stroke-width: 2px;      
    stroke: #F4F4F4;
  }

  .Header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12rem;

    .HeaderLeft {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .HeaderActions {
      display: flex;
      gap: 1rem;
      align-items: center;

      .CajaStatus {
        min-width: 168px;
        height: 54px;
        border: none;
        border-radius: 10px;
        font-family: 'Delm', sans-serif;
        font-size: 21px;
        cursor: pointer;
        transition: all 0.2s ease;
        padding: 0 1.5rem;
      }

      .CajaStatus.active {
        background: #5347CD;
        color: #FFFFFF;
        box-shadow: 0 4px 6px rgba(83, 71, 205, 0.2);
      }

      .CajaStatus:not(.active) {
        background: #EBECF0;
        color: #2D3142;
        &:hover {
          background: #DFE1E5;
        }
      }

      .ActionButton {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        height: 54px;
        padding: 0 1.75rem;
        border: 2px solid #EBECF0;
        border-radius: 10px;
        background: none;
        font-family: 'Delm', sans-serif;
        font-size: 15px;
        color: #8F959C;
        cursor: pointer;
        transition: all 0.2s ease;
        &:hover {
          background: #F2F4F5;
          color: #2D3142;
        }
      }
    }
  }

  

  .BackButton {
    background: #F2F4F5;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    color: #919598;
    padding: 8px;
    transition: transform 0.2s ease;
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        transform: translateX(-2px);
    }
  }

  .Cards {
    display: flex;          /* Cambiamos a flex */
    flex-wrap: wrap;        /* Permite que los ítems salten a la siguiente línea */
    gap: 1rem;              /* Espacio entre los ítems */

  }

  .Sales_Clients {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .FinalDashboard {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    .Buttons {
      display: grid;
    }
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${(props) => props.theme.gray500};
  margin: ${v.lgSpacing} 0;
`;