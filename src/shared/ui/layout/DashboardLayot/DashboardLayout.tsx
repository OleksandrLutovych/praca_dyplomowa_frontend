import {
    Box,
    CssBaseline,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material";
import {CiLogout as LogoutIcon, CiMenuFries as MenuIcon} from "react-icons/ci";
import {ReactNode, useState} from "react";
import {AppBar, Drawer, DrawerHeader} from "../../components";
import {useNavigate} from "react-router-dom";

type Props = {
    children: JSX.Element
    menuItems: {
        title: string,
        path: string,
        icon: ReactNode
    }[]
}

const DashboardLayout = ({children, menuItems}: Props) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const toogleDrawer = () => {
        setOpen(prev => !prev);
    };


    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toogleDrawer}
                        edge="start"
                        sx={[
                            {
                                marginRight: 5,
                            },
                            open && {display: 'none'},
                        ]}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
                        <Typography variant="h6" noWrap component="div">
                            Praca dyplomowa
                        </Typography>
                        <IconButton sx={{
                            color: "white",
                        }}><LogoutIcon/></IconButton>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={toogleDrawer}>
                        {theme.direction === 'rtl' ? <MenuIcon/> : <MenuIcon/>}
                    </IconButton>
                </DrawerHeader>
                <List>
                    {menuItems.map(({
                                        title,
                                        icon,
                                        path
                                    }) => (
                        <ListItem key={title} disablePadding sx={{display: 'block'}}>
                            <ListItemButton onClick={() => navigate(path)}
                                            sx={[
                                                {
                                                    minHeight: 48,
                                                    px: 2.5,
                                                },
                                                open
                                                    ? {
                                                        justifyContent: 'initial',
                                                    }
                                                    : {
                                                        justifyContent: 'center',
                                                    },
                                            ]}
                            >
                                <ListItemIcon
                                    sx={[
                                        {
                                            minWidth: 0,
                                            justifyContent: 'center',
                                        },
                                        open
                                            ? {
                                                mr: 3,
                                            }
                                            : {
                                                mr: 'auto',
                                            },
                                    ]}
                                >
                                    {icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={title}
                                    sx={[
                                        open
                                            ? {
                                                opacity: 1,
                                            }
                                            : {
                                                opacity: 0,
                                            },
                                    ]}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader/>
                {children}
            </Box>
        </Box>
    );
};

export default DashboardLayout;