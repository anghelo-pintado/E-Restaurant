import { IconType } from "react-icons";
import styled from "styled-components"

interface ContainerProps {
    theSize: number;
}

interface ReportContainerProps {
    icon?: IconType;
    title: string;
    description: string;
    size: number;
}

export function ReportContainer({ icon: Icon, title, description, size }: ReportContainerProps) {  
    return(
        <Container theSize={size}>
            <div className = "Title">
                {title}
            </div>

            <div className = "Description">
                {description}
            </div>
        </Container>
    );
}

const Container = styled.div<ContainerProps>`
    width: ${({ theSize }) => (theSize ? `${theSize}` : '5')}px;
    height: 174px;
    border-radius: 10px;
    border: 3px solid #EBEDEC;
    background: #FFF;
    align-content: end;
    padding: 0 0 19px 19px;
    cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease,
    transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    transform: scale(1.02);
  }


    .Title {
        color: #000005;
        font-family: Delm;
        font-size: 40px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .Description {
        color: #282A2C;
        font-family: sans-serif;
        font-size: 17px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;