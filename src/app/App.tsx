import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { ActivateAccountPage, LoginPage, RegisterPage } from '../pages/auth/ui';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../shared/api/query-client.ts';
import ProtectedRoute from "../pages/auth/routes/ProtectedRoute.tsx";
import DoctorRegisterPage from "../pages/auth/ui/DoctorRegisterPage.tsx";
import { CiStethoscope as MainIcon } from "react-icons/ci";
import { DashboardLayout } from "../shared/layouts";
import { Provider } from "react-redux";
import { store } from "./stores/main-store.ts";
import { DoctorsListPage, DoctorViewPage } from '../pages/doctors';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'
import { MyProfile } from '../features/profile/ui/index.ts';
import { FaRegUserCircle as ProfileIcon } from "react-icons/fa";
import { FaUserDoctor as DoctorIcon } from "react-icons/fa6";
import { Dashboard } from '../pages/dashboard/ui/index.ts';
import { RxDashboard as DashboardIcon, RxCalendar as CalendarIcon } from "react-icons/rx";

function App() {

    const menuItems = [
        { title: "Strona Główna", path: "/dashboard", icon: <DashboardIcon size={25} /> },
        { title: "Kalendarz", path: "calendar", icon: <CalendarIcon size={25} /> },
        { title: "Lekarze", path: "doctors", icon: <DoctorIcon size={25} /> },
        { title: "Mój profil", path: "profile", icon: <ProfileIcon size={25} /> },
    ]

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path={'/'} element={<Navigate to={'/login'} replace />} />
                        <Route path={'/login'} element={<LoginPage />} />
                        <Route path={'/register'} element={<RegisterPage />} />
                        <Route path={'/doctor-register'} element={<DoctorRegisterPage />} />
                        <Route path={'/activate-account/:id'} element={<ActivateAccountPage />} />
                        <Route path={'/dashboard/*'} element={
                            <ProtectedRoute>
                                <DashboardLayout menuItems={menuItems}>
                                    <Outlet />
                                </DashboardLayout>
                            </ProtectedRoute>
                        }>
                            <Route path={''} element={<Dashboard />} />
                            <Route path={'doctors'} element={<DoctorsListPage />} />
                            <Route path={'doctors/:id'} element={<DoctorViewPage />} />
                            <Route path={'profile'} element={<MyProfile />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </Provider>

    );
}

export default App;
