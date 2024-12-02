import { Card } from "../../ui/components";
import { Logo } from "../../ui";
import { Backdrop, CircularProgress } from "@mui/material";
import { FC } from "react";
import SignInContainer from "./SignInContainer.ts";

type Props = {
    children: React.ReactNode;
    isLoading: boolean;
};

const AuthLayout: FC<Props> = ({ children, isLoading }) => {
    return (
        <SignInContainer direction="column" justifyContent="space-between">
            <Card variant="outlined">
                <Logo />

                {children}
            </Card>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </SignInContainer>
    );
};

export default AuthLayout;