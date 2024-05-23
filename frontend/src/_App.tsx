import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useEffect } from 'react'
import { Navigation } from './components/Navigation'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { Login } from './components/perfectlab/auth/Login'
import Aside from './components/perfectlab/common/Aside'
import MyDashboard from './components/perfectlab/common/MyDashboard'
import FindAppointment from './components/perfectlab/common/FindAppointment'
import BookAppointment from './components/perfectlab/clerk/BookAppointment'
import AddNewClient from './components/perfectlab/clerk/AddNewClient'
import MyAppointment from './components/perfectlab/common/MyAppointment'
import '@mantine/core/styles.css';
import DefaultLayout from './components/perfectlab/auth/DefaultRoutes'
import { setTimeout } from 'timers'
import { useIdle } from '@mantine/hooks'
import PwdResetReq from './components/perfectlab/auth/PwdResetReq'
import { Register } from './components/perfectlab/auth/Register'
import ProtectedLayout from './components/perfectlab/auth/ProtectedRoutes'
import { useMediaQuery } from '@mantine/hooks';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Avatar } from '@mantine/core';
import Dashboard from '@mui/icons-material/Dashboard';
import { IconUserPlus } from '@tabler/icons-react';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 0,
    width: `calc(100%)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: 'drawerWidth',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function _App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar  position="fixed" open={open} style={{backgroundColor:"white", color:"black", display:"flex"}}>
        <Toolbar className=' flex gap-5 w-[100vw]<IconButton /> items-center justify-between'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={()=>setOpen(!open)}
            edge="start"
          >
            <MenuIcon className=' text-black' />
          </IconButton>
          <Typography variant="h6" className=' hidden md:block flex-1' noWrap component="div">
            PerfectLabIS
          </Typography>
          <div className=' flex items-center justify-between'>
        <IconButton ><NotificationsNoneIcon className=' text-3xl' /></IconButton >
        <IconButton ><SearchIcon className=' text-3xl' /></IconButton>
        <IconButton ><PersonOutlineIcon className=' text-3xl' /></IconButton >
      </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} className=' drawer sm:w-[100vw] lg:w-[240px]' >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {localStorage.getItem("is_cler") == "True" && [{name: 'Dashboard', icon:<Dashboard />},{name: 'Add New Client', icon:<IconUserPlus />}, ].map((item) => (
            <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width:"100%", }} >
        <DrawerHeader />
      <Routes>
        <Route element={<ProtectedLayout />}>
        <Route path='/' element={<MyDashboard  />} />
        {/* 
        <Route path='/myAppointments' element={<MyAppointment />} />
        <Route path='/findAppointment' element={<FindAppointment />} />
        <Route path='/addNewAppointment' element={<BookAppointment />} />
        <Route path='/addNewClient' element={<AddNewClient />} />
        </Route>
        <Route element={<DefaultLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pwdResetRequest" element={<PwdResetReq />} /> */}
        </Route>
      </Routes>
      </Box>
    </Box>
  );
}
