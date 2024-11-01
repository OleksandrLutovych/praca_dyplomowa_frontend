import {CssBaseline} from "@mui/material";
import DoctorRegisterForm from "../../../features/register/forms/DoctorRegisterForm/DoctorRegisterForm.tsx";

const DoctorRegisterPage = () => {
    return (
        <>
            <CssBaseline enableColorScheme/>
            <DoctorRegisterForm/>
        </>
    );
};

export default DoctorRegisterPage;