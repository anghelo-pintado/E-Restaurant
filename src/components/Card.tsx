import { IconType } from "react-icons";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import styled from "styled-components";

interface ContainerProps {
    isPosi?: boolean;
}

interface CashRegisterProps {
  icon: IconType;
  percentage: number;
  value: number;
  name: string;
}

export const Card = ({ icon: Icon, percentage, value, name }: CashRegisterProps) => {
    const isPositive = percentage! >= 0;
    const formattedValue = value
    .toLocaleString('es-PE')
    .replace(/\./g, '|')
    .replace(/,/g, '.')
    .replace(/\|/g, ',');
    const currency = 'S/ ';

    return (
    <>
      <Container isPosi = {isPositive}>
        <div className = "CardHeader">
            <div className = "IconContainer">
                <Icon size = {24} color="#919598"/>
            </div>
            <div className={`PercentageContainer ${isPositive ? 'positive' : 'negative'}`}>
                <span>{isPositive ? `+${percentage}%` : `${percentage}%`}</span>
                {isPositive ? (
                    <FaArrowCircleUp className="ArrowIcon" />
                ) : (
                    <FaArrowCircleDown className="ArrowIcon" />
                )}
            </div>
        </div>

        <div className="CardValue">
        {currency && <span className = "Currency">{currency}</span>}
        {formattedValue}
      </div>

      <div className="CardName">
        {name}
      </div>

      </Container>
    </>
  );
};

const Container = styled.div<ContainerProps>`
    width: 265px;
    height: 174px;
    border-radius: 10px;
    border: 3px solid #EBEDEC;
    background: #FFF;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    padding: 17px 0 0 19px;

    .CardHeader {
        display: flex;
        align-items: center;

        .IconContainer {
            width: 45px;
            height: 50px;
            border-radius: 10px;
            background: #F2F4F5;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .PercentageContainer {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-family: 'Delm', sans-serif;
            font-size: 14px;
            padding: 10px 8px;
        }

        .PercentageContainer.positive {
            color: #22C55E;
        }

        .PercentageContainer.negative {
            color: #EF4444;
        }

        .ArrowIcon {
            font-size: 16px;
            stroke-width: 3px;
        }
    }

    .CardValue {
        color: #000005;
        font-family: 'Delm', sans-serif;
        font-size: 40px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding: 14px 0 4px 0;

        .Currency {
            font-family: 'Delm', sans-serif;
        }
    }

    .CardName {
        color: #282A2C;
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-size: 16px;
        font-weight: 400;
        line-height: normal;
    }

`;
