import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom';
import {ActivateAccountPage, LoginPage, RegisterPage} from '../pages/auth/ui';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '../shared/api/query-client.ts';
import ProtectedRoute from "../pages/auth/routes/ProtectedRoute.tsx";
import DoctorRegisterPage from "../pages/auth/ui/DoctorRegisterPage.tsx";
import DashboardLayout from "../shared/ui/layout/DashboardLayot/DashboardLayout.tsx";
import {CiStethoscope as MainIcon} from "react-icons/ci";
import Dashboard from "../features/dashboard/Dashboard.tsx";

function App() {

    const menuItems = [
        {title: "Strona Główna", path: "/dashboard", icon: <MainIcon size={25}/>},
        {title: "Lekarze", path: "doctors", icon: <MainIcon size={25}/>},
        {title: "Kalendarz", path: "my-calendar", icon: <MainIcon size={25}/>},
        {title: "Recepty", path: "recipes", icon: <MainIcon size={25}/>},
    ]


    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/login'} replace/>}/>
                    <Route path={'/login'} element={<LoginPage/>}/>
                    <Route path={'/register'} element={<RegisterPage/>}/>
                    <Route path={'/doctor-register'} element={<DoctorRegisterPage/>}/>
                    <Route path={'/activate-account/:id'} element={<ActivateAccountPage />}/>
                    <Route path={'/dashboard/*'} element={
                        <ProtectedRoute>
                            <DashboardLayout menuItems={menuItems}>
                                <Outlet/>
                            </DashboardLayout>
                        </ProtectedRoute>
                    }>
                        <Route path={''} element={<Dashboard/>}/>
                        <Route path={'doctors'} element={<Dashboard/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
