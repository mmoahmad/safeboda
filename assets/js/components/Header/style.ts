import styled from 'styled-components';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const AppTitle = styled(Link)`
  color: #fff;
  &:hover {
    color: #fff;
    text-decoration: none;
  }
`;

export const UserDropDown = styled(NavDropdown)`
  > a {
    font-size: 1rem;
    padding: 0;
    &:after {
      display: none;
    }
  }
  
  .dropdown-menu-right {
    right: 0 !important;
    left: auto !important;
  }
`;

export const CustomImage = styled.img`
  width: 30px;
  height: 30px;
`;
