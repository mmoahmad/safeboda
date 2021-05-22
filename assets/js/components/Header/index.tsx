import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AppRoutes, DashboardRoutes } from '../../routes';
import { APP_NAME } from '../../config';
import {
  UserDropDown,
  AppTitle,
  CustomImage
} from './style';
import { connect } from 'react-redux';

/**
 * Header is a template top navigation bar of user layout
 */
const Header = (props: any) => {
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Brand>
        <AppTitle to={AppRoutes.DASHBOARD.path}>{APP_NAME}</AppTitle>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
        {Object.values(DashboardRoutes)
            .filter((route: any) => route.showInMenu && !route.parentId)
            .map((route: any) => {
              return (
                <Nav.Link key={route.name} href={route.path}>{route.showInMenu}</Nav.Link>
              )
            })}
        </Nav>
        <Nav>
          <UserDropDown alignRight id='userDropDown' className='dropdown-menu-right' title={[
            (<Navbar.Text className="mr-1" key="title" style={{ color: 'white' }}>
              {`${props.user.first_name} ${props.user.last_name}`}
            </Navbar.Text>),
            props.user.image
              ? (<CustomImage key="icon" className='border rounded-circle' src={props.user.image} />)
              : (<FontAwesomeIcon key="icon" icon={faUserCircle} title='' />)
          ]}>
            <NavDropdown.Item href={AppRoutes.LOGOUT.path}>
              <NavDropdown.ItemText>Logout</NavDropdown.ItemText>
            </NavDropdown.Item>
          </UserDropDown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, null)(Header);
