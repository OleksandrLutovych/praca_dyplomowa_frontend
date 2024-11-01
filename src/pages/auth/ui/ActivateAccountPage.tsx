import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {activateAccountApi} from "../../../features/activate-account/api";
import {Alert, Backdrop, Button, CircularProgress} from "@mui/material";
import {SignInContainer} from "../../../shared/ui/layout";

const ActivateAccountPage = () => {
    const params = useParams()
    const userId = Number(params.id)
    const navigate = useNavigate()

    const {isSuccess, isPending} = useQuery({
        queryKey: ['activateAccount'],
        queryFn: async () => activateAccountApi({id: userId})
    })
    return (
        <>
            <SignInContainer direction="column" justifyContent="space-between">
                <Backdrop
                    sx={(theme) => ({color: '#fff', zIndex: theme.zIndex.drawer + 1})}
                    open={isPending}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
                {isSuccess &&
                    (<Alert variant="filled" severity="success" action={
                        <Button onClick={() => navigate('/login')} color="inherit" variant={'outlined'}>Zaloguj
                            się</Button>
                    }>
                        Konto zostało aktywowane! Możesz się zalogować.
                    </Alert>)
                }
            </SignInContainer>
        </>
    );
};

export default ActivateAccountPage;