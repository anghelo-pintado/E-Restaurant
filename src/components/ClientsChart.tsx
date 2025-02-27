import { useState } from "react";
import { FiArrowDown, FiArrowUp, FiFilter, FiUsers } from "react-icons/fi";
import { ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import styled from "styled-components";

interface ContainerProps {
  isPosi: boolean;
}

interface ClientData {
  name: string;
  value: number;
  isMax?: boolean;
}

interface ClientsChartProps {
  data: ClientData[];
  filter: "daily" | "weekly" | "monthly";
  totalClients: number;
  percentageChange: number;
}

export const ClientsChart = ({
  data,
  filter,
  totalClients,
  percentageChange,
}: ClientsChartProps) => {
  const isPositive = percentageChange >= 0;
  const absoluteChange = Math.abs((percentageChange * totalClients) / 100).toFixed(0);

  // Manejo de estado en componente funcional
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data[activeIndex];

  // handleClick definido para componentes funcionales
  const handleClick = (_data: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <Container isPosi={isPositive}>
      <div className="CardHeader">
        <div className = "TitleContainer">
            <div className="IconContainer">
                <FiUsers size={24} color="#919598" />
            </div>
            <div className= "Title">Total de Clientes</div>
        </div>
        
        <button className="FilterButton">
          <FiFilter size={24} color="#919598" />
          {filter === "daily" && " Días seleccionados"}
          {filter === "weekly" && " Semanales"}
          {filter === "monthly" && " Mensuales"}
        </button>
      </div>

      <div className="CardValue">{totalClients} clientes</div>

      <div className="ChangeSection">
        <div className="PercentageContainer">
          {isPositive ? <FiArrowUp /> : <FiArrowDown />}
          <span>{isPositive ? `+${percentageChange}%` : `${percentageChange}%`}</span>
        </div>
        <div className="AmountChange">
          <span>
            {isPositive
              ? `+ ${absoluteChange} clientes aumentó`
              : `- ${absoluteChange} clientes disminuyó`}
          </span>
        </div>
      </div>

      <div style={{ width: "100%" }}>
        <ResponsiveContainer width="100%" height={290}>
          <BarChart data={data}>
            <Bar dataKey="value" onClick={handleClick} >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  cursor="pointer"
                  fill={index === activeIndex ? "#82ca9d" : "#D9D9D9"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="Detail">{`Día ${activeItem.name}: ${activeItem.value} clientes`}</p>
      </div>
    </Container>
  );
};

const Container = styled.div<ContainerProps>`
  width: 540px;
  height: auto;
  border-radius: 10px;
  border: 3px solid #ebedec;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  padding: 17px 0 0 19px;
  
  
  .CardHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;

    .TitleContainer {
        display: flex;
        align-items: center;
        gap: 1rem;

        .IconContainer {
            width: 45px;
            height: 50px;
            border-radius: 10px;
            background: #F2F4F5;
            display: flex;             
            align-items: center;
            justify-content: center;
        }

        .Title {
            color: #000005;
            font-family: Delm;
            font-size: 28px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }
        
    .FilterButton {
        background: #F2F4F5;
        border-radius: 10px;
        align-items: center;
        cursor: pointer;
        padding: 8px;
        border: 2px solid #EBECF0;
        transition: transform 0.2s ease;

        &:hover {
            border-color: #D4D6DA;
            background: #F8F9FB;
        }

        color: #8F959C;
        font-family: Delm;
        font-size: 21px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
  }

  .CardValue {
    color: #000005;
    font-family: Delm;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .ChangeSection {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;

    .PercentageContainer {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 14px;
        padding: 8px;
        border-radius: 10px;
        background: ${({ isPosi }) => isPosi ? '#E6F4F6' : '#FDEDEF'};
        color: ${({ isPosi }) => isPosi ? '#57A59D' : '#973343'};
    }

    .AmountChange {
        font-size: 16px;
        color: #6A6E7A;
    }
  }
`;
