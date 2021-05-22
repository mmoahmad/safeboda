import styled from 'styled-components';
import { Container as BSContainer } from 'react-bootstrap';

export const Container = styled(BSContainer)`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
`;
