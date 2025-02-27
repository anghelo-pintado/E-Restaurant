import styled from 'styled-components';
import { useEffect, useState } from 'react';

interface TitleSectionProps {
  title: string;
}

export const Head = ({ title }: TitleSectionProps) => {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const formatDate = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        localeMatcher: 'best fit'
      };
      
      return new Intl.DateTimeFormat('es-ES', options).format(date);
    };

    setCurrentDate(formatDate());
  }, []);

  return (
    <Container>
      <div className= 'TopSection'>
        {title}
      </div>
      <div className= 'DateSection'>
        {currentDate}
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  gap: 8px;

  .TopSection {
    width: 446px;
    height: 49px;
    flex-shrink: 0;
    color: #000005;
    font-family: 'Delm', sans-serif;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0;
  }

  .DateSection {
    color: #6A6E7A;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
