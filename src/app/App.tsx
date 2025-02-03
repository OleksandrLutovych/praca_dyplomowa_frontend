import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { ActivateDoctorAccount, ActivatePatientAccount, LoginPage, RegisterPage } from '../pages/auth/ui';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../shared/api/query-client.ts';
import ProtectedRoute from "../pages/auth/routes/ProtectedRoute.tsx";
import DoctorRegisterPage from "../pages/auth/ui/DoctorRegisterPage.tsx";
import { DashboardLayout } from "../shared/layouts";
import { Provider } from "react-redux";
import { store } from "./stores/main-store.ts";
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'
import { MyProfile } from '../features/profile/ui/index.ts';
import { FaEnvira, FaRegUserCircle as ProfileIcon } from "react-icons/fa";
import { FaUserDoctor as DoctorIcon } from "react-icons/fa6";
import { Dashboard } from '../pages/dashboard/ui/index.ts';
import { RxDashboard as DashboardIcon, RxCalendar as CalendarIcon } from "react-icons/rx";
import { DoctorsListPage, DoctorViewPage } from '../pages/doctors/ui/index.ts';
import { Roles } from '../entities/user/enums.ts';
import { CalendarPage } from '../features/my-calendar/pages/index.ts';
import { DoctorConsultViewPage } from '../features/doctor-consults/pages/index.ts';
import DoctorAvailabilityPage from '../features/doctor-availability/pages/DoctorAvailabilityPage.tsx';
import DoctorAvailabilityCreatePage from '../features/doctor-availability/pages/DoctorAvailabilityCreatePage.tsx';
import DoctorAvailabilityCreateCustomPage from '../features/doctor-availability/pages/DoctorAvailabilityCreateCustomPage.tsx';
import { PatientPersonalVisitsListPage, PatientPersonalVisitsViewPage } from '../features/patient-personal-visits/pages/index.ts';

function App() {

    const menuItems = [
        { title: "Strona Główna", path: "/dashboard", icon: <DashboardIcon size={25} /> },
        { title: "Kalendarz", path: "calendar", roles: [Roles.DOCTOR], icon: <CalendarIcon size={25} /> },
        { title: "Czas pracy", path: "availability", roles: [Roles.DOCTOR], icon: <CalendarIcon size={25} /> },
        { title: "Lekarze", path: "doctors", roles: [Roles.PATIENT], icon: <DoctorIcon size={25} /> },
        { title: "Moje wizyty", path: "my-visits", roles: [Roles.PATIENT], icon: <FaEnvira size={25} /> },
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
                        <Route path={'/activate-doctor/:id'} element={<ActivateDoctorAccount />} />
                        <Route path={'/activate-patient/:id'} element={<ActivatePatientAccount />} />
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
                            <Route path={'calendar'} element={<CalendarPage />} />
                            <Route path={'consults'} element={<div>Consults</div>} />
                            <Route path={'consults/:id'} element={<DoctorConsultViewPage />} />
                            <Route path={'availability'} element={<DoctorAvailabilityPage />} />
                            <Route path={'availability/add'} element={<DoctorAvailabilityCreatePage />} />
                            <Route path={'availability/add-custom'} element={<DoctorAvailabilityCreateCustomPage />} />
                            <Route path={'my-visits'} element={<PatientPersonalVisitsListPage />} />
                            <Route path={'my-visits/:id'} element={<PatientPersonalVisitsViewPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </Provider>

    );
}

export default App;
