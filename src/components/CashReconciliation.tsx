import { useState } from "react";
import { FiDollarSign } from "react-icons/fi";
import styled from "styled-components";

interface CashReconciliationProps {
  systemMoney: number;
}

// Función para formatear moneda
function formatCurrency(value: number): string {
    return value.toLocaleString('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
}

export const CashReconciliation = ({ systemMoney }: CashReconciliationProps) => {
  const [coins, setCoins] = useState<string>("");
  const [bills, setBills] = useState<string>("");

  const totalCoins = parseFloat(coins) || 0;
  const totalBills = parseInt(bills) || 0;
  const totalCounted = totalCoins + totalBills;
  const difference = systemMoney - totalCounted;

  const getDifferenceColor = () => {
    if (difference === 0) return "green";
    if (difference > 0) return "yellow";
    return "red";
  };

  return (
    <Container>
      <Header>
        <IconContainer>
          <FiDollarSign size = {24} color="#919598" />
        </IconContainer>
        <Title>Arqueo de Caja</Title>
      </Header>
      <Content>
        <InputGroup>
          <InputContainer>
            <Label>Sencillo</Label>
            <Input
              type="number"
              step="0.01"
              value={coins}
              onChange={(e) => setCoins(e.target.value)}
              placeholder="0.00"
            />
            <TotalLabel>Total Sencillo: {totalCoins.toFixed(2)}</TotalLabel>
          </InputContainer>

          <InputContainer>
            <Label>Billetes</Label>
            <Input
              type="number"
              value={bills}
              onChange={(e) => setBills(e.target.value)}
              placeholder="0"
            />
            <TotalLabel>Total Billetes: {totalBills.toLocaleString()}</TotalLabel>
          </InputContainer>

          <DifferenceContainer color={getDifferenceColor()}>
            <DifferenceValue>
              {formatCurrency(difference)}
            </DifferenceValue>
            <DifferenceLabel>Diferencia</DifferenceLabel>
          </DifferenceContainer>
        </InputGroup>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 830px;
  height: auto;
  border-radius: 10px;
  border: 3px solid #ebedec;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  padding: 2rem;
  font-family: "Delm", sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const IconContainer = styled.div`
  width: 45px;
  height: 50px;
  background: #f2f4f5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #2d3142;
  margin: 0;
`;

const Content = styled.div`
  display: flex;
  gap: 2rem;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
`;

const InputContainer = styled.div`
  flex: 1;
`;

const Label = styled.label`
  display: block;
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ebecf0;
  border-radius: 8px;
  font-size: 16px;
  font-family: "Delm", sans-serif;
  &:focus {
    outline: none;
    border-color: #5347cd;
  }
`;

const TotalLabel = styled.div`
  color: #8f959c;
  margin-top: 0.5rem;
  font-size: 14px;
`;

interface DifferenceProps {
  color: string;
}

const DifferenceContainer = styled.div<DifferenceProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 1rem;
  min-width: 150px;
  background: ${({ color }) =>
    color === "green"
      ? "#DCFCE7"
      : color === "red"
      ? "#FEE2E2"
      : "#FEF9C3"};
  color: ${({ color }) =>
    color === "green"
      ? "#22C55E"
      : color === "red"
      ? "#EF4444"
      : "#EAB308"};
`;

const DifferenceValue = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const DifferenceLabel = styled.div`
  font-size: 14px;
`;
