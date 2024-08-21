import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useStoreActions, useStoreState } from 'easy-peasy';


const Navbar=()=>{
  const {data}=useStoreState(state=>state.user)
  const {logoutUser}=useStoreActions(action=>action.user)
  const {data:cartData,allCartData}=useStoreState(state=>state.cart)
  const {getCartData}=useStoreActions(action=>action.cart)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  React.useEffect(()=>{
    getCartData()
  },[cartData])

  if(!allCartData){
    return
  }
  console.log(data)
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={allCartData.length} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
        <Box sx={{ flexGrow: 0.5 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            fontSize="30px"
            
          >
            Organic Vegetables
          </Typography>

          <Box sx={{ flexGrow: 0.5 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to="/product">
            <Button sx={{color:'white',paddingTop:'15px'}}>products</Button>
            </Link>

            <Link to="/order">
            <Button sx={{color:'white', paddingTop:'15px'}}>order</Button>
            </Link>

              {
                data
                ?
                  <Link onClick={logoutUser}>
                  <Button sx={{color:'white', paddingTop:'15px'}}>logout</Button>
                  </Link>
                :
                  <Link to="/login">
                  <Button sx={{color:'white',paddingTop:'15px'}}>login</Button>
                  </Link>
              }



            <Link to="register">
            <Button sx={{color:'white', paddingTop:'15px'}}>register</Button>
            </Link>

            <Link to="/addToCart">
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={allCartData?.length} color="error">
                <ShoppingCartIcon sx={{color:'white',fontSize:'30px'}} />
              </Badge>
            </IconButton>
            </Link>

            <Link to="/favorite">
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={5} color="error">
                <FavoriteIcon sx={{color:'red',fontSize:'30px'}} />
              </Badge>
            </IconButton>
            
            </Link>

            {
              data&&<div style={{display:'flex',alignItems:"center",marginLeft:'10px'}}>
              <Chip label={data?.email} sx={{color:'white'}}/>
              </div>
            }
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
export default Navbar;