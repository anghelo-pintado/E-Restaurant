import { IconType } from "react-icons";
import styled from "styled-components";

interface CustomButtonProps {
  icon: IconType;
  name: string;
  color: string;
  onClick?: () => void;
}

export const CustomButton = ({ icon: Icon, name, color, onClick }: CustomButtonProps) => {
  return (
    <Button $color={color} onClick={onClick}>
      <Icon size={24} />
      <span>{name}</span>
    </Button>
  );
};

const Button = styled.button<{ $color: string }>`
  width: 540px; 
  height: 75px;
  padding: 8px 12px;
  border-radius: 10px;
  border: 3px solid #ebedec;
  background: ${(props) => props.$color};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 0.9;
  }

  span {
    font-family: 'Delm', sans-serif;
    font-size: 21px;
    color: #FFFFFF;
  }
`;