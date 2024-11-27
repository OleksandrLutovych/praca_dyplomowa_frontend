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
    Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import { ReactNode, useState } from "react";
import { CiLogout as LogoutIcon, CiMenuFries as MenuIcon } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../hooks/useUserData";
import { AppBar, Drawer, DrawerHeader } from "../../ui/components";
import { Roles } from "../../../entities/user/enums";
import { queryCache, queryClient } from "../../api/query-client";

type Props = {
    children: JSX.Element
    menuItems: {
        title: string,
        path: string,
        icon: ReactNode,
        roles?: Roles[]
    }[]
}

const DashboardLayout = ({ children, menuItems }: Props) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const { data } = useUserData();

    const toogleDrawer = () => {
        setOpen(prev => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        queryClient.clear()
        navigate('/login');
    }

    console.log(data?.roles)


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
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
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
                        <Typography variant="h6" noWrap component="div">
                            Praca dyplomowa
                        </Typography>
                        <Tooltip title="Wyloguj się" arrow>
                            <IconButton sx={{ color: "white" }} onClick={handleLogout}>
                                <LogoutIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={toogleDrawer}>
                        {theme.direction === 'rtl' ? <MenuIcon /> : <MenuIcon />}
                    </IconButton>
                </DrawerHeader>
                <List>
                    {data && menuItems.map(({
                        title,
                        icon,
                        path,
                        roles
                    }) => {
                        if (roles?.length && !roles.some(r => data.roles.includes(r))) return null;


                        return <ListItem key={title} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton onClick={() => navigate(path)}
                                sx={[{ minHeight: 48, px: 2.5, },
                                open ? { justifyContent: 'initial', } : { justifyContent: 'center' },
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
                    })}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
};

export default DashboardLayout;