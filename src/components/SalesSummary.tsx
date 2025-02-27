import { FiArrowDown, FiArrowUp, FiDollarSign } from "react-icons/fi";
import styled from "styled-components";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface SalesSummaryProps {
  totalSales: number;
  percentageChange: number;
  invoiceAmount: number;
  ticketAmount: number;
  canceledSales: number;
}



const COLORS = ['#2A74D4', '#DB9E61'];

// Función para formatear moneda
function formatCurrency(value: number): string {
  return value.toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Componente principal
export const SalesSummary = ({
  totalSales,
  percentageChange,
  invoiceAmount,
  ticketAmount,
  canceledSales,
}: SalesSummaryProps) => {
  const isPositive = percentageChange >= 0;
  const changeAmount = (totalSales * Math.abs(percentageChange)) / 100;
  const chartData = [
    { name: 'Factura', value: invoiceAmount },
    { name: 'Boleta', value: ticketAmount },
  ];

  return (
    <Container>
      <Header>
        <IconContainer>
          <FiDollarSign size={24} color="#919598"/>
        </IconContainer>
        <Title>Resumen de ventas</Title>
        <CanceledSales>
          <CanceledTitle>Ventas anuladas</CanceledTitle>
          <CanceledAmount>{canceledSales}</CanceledAmount>
        </CanceledSales>
      </Header>

      <Amount>{formatCurrency(totalSales)}</Amount>

      <ChangeSection>
        <PercentageContainer $isPositive={isPositive}>
          {isPositive ? <FiArrowUp /> : <FiArrowDown />}
          <span>{isPositive ? `+${percentageChange}%` : `${percentageChange}%`}</span>
        </PercentageContainer>
        <AmountChange $isPositive={isPositive}>
            <span>{isPositive ? `+ ${formatCurrency(changeAmount)} aumentó` : `- ${formatCurrency(changeAmount)} disminuyó`}</span>
        </AmountChange>
      </ChangeSection>

      <ChartContainer>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <Legend>
          {chartData.map((item, index) => (
            <LegendItem key={item.name}>
              <ColorBox $color={COLORS[index]} />
              <span>{item.name}</span>
              <span>{formatCurrency(item.value)}</span>
            </LegendItem>
          ))}
        </Legend>
      </ChartContainer>
    </Container>
  );
};

// Estilos
const Container = styled.div`
  width: 830px;
  padding: 2rem;
  border-radius: 10px;
  border: 3px solid #EBEDEC;
  background: #FFF;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-family: 'Delm', sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const IconContainer = styled.div`
  width: 45px;
  height: 50px;
  border-radius: 10px;
  background: #F2F4F5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  color: #000005;
  font-family: Delm;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 0 45% 0 0;
`;

const CanceledSales = styled.div`
    background: #FEE2E2;
    display: grid;
    text-align: center;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 10px;
`;

const CanceledTitle = styled.div`
    color: #EF4444;
    font-size: 16px;
    margin: 0 0 0.5rem 0;
    font-weight: 500;
`;

const CanceledAmount = styled.div`
  color: #EF4444;
  font-size: 32px;
  font-weight: 700;
`;

const Amount = styled.div`
  color: #000005;
  font-family: Delm;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 1.5rem;
`;

const ChangeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const PercentageContainer = styled.div<{ $isPositive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
  padding: 8px;
  border-radius: 10px;
  background: ${({ $isPositive }) => $isPositive ? '#E6F4F6' : '#FDEDEF'};
  color: ${({ $isPositive }) => $isPositive ? '#57A59D' : '#973343'};
`;

const AmountChange = styled.div<{ $isPositive: boolean }>`
  font-size: 16px;
  color: #6A6E7A;
`;

const ChartContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 14px;
  color: #2D3142;
`;

const ColorBox = styled.div<{ $color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: ${({ $color }) => $color};
`;

