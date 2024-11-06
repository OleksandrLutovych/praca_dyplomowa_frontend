import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {activateAccountApi} from "../../../features/activate-account/api";
import {Alert, Button} from "@mui/material";
import {AuthLayout} from "../../../shared/layouts";

const ActivateAccountPage = () => {
    const params = useParams()
    const userId = Number(params.id)
    const navigate = useNavigate()

    const {isSuccess, isPending} = useQuery({
        queryKey: ['activateAccount'],
        queryFn: async () => activateAccountApi({id: userId})
    })
    return (
        <AuthLayout isLoading={isPending}>
            <>

                {isSuccess &&
                    (<Alert variant="filled" severity="success" action={
                        <Button onClick={() => navigate('/login')} color="inherit" variant={'outlined'}>Zaloguj
                            się</Button>
                    }>
                        Konto zostało aktywowane! Możesz się zalogować.
                    </Alert>)
                }
            </>
        </AuthLayout>
    );
};

export default ActivateAccountPage;