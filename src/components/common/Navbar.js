// src/components/common/Navbar.js
import React, { useContext } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth({ isAuthenticated: false, role: null });
    navigate('/login');
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          Tournament App
        </Typography>

        {/* Navigation Links */}
        {auth.isAuthenticated ? (
          <>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="nav-menu"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Mobile Menu */}
            <Menu
              id="nav-menu"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem component={Link} to="/dashboard" onClick={handleCloseNavMenu}>
                Dashboard
              </MenuItem>
              <MenuItem component={Link} to="/profiles" onClick={handleCloseNavMenu}>
                Profiles
              </MenuItem>
              <MenuItem component={Link} to="/tickets" onClick={handleCloseNavMenu}>
                Tickets
              </MenuItem>
              {auth.role === 'admin' && (
                <MenuItem component={Link} to="/admin" onClick={handleCloseNavMenu}>
                  Admin
                </MenuItem>
              )}
            </Menu>

            {/* Desktop Menu */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/profiles">
                Profiles
              </Button>
              <Button color="inherit" component={Link} to="/tickets">
                Tickets
              </Button>
              {auth.role === 'admin' && (
                <Button color="inherit" component={Link} to="/admin">
                  Admin
                </Button>
              )}
            </Box>

            {/* User Menu */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 2 }}>
                  <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="user-menu"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          </>
        ) : (
          <Box>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

