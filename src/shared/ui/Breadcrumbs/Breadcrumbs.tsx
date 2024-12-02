import { Typography, Breadcrumbs as MuiBreadcrumbs, Link, Box } from "@mui/material";
import { FC } from "react";

type Props = {

}

const Breadcrumbs: FC<Props> = () => {
  return (
    <Box sx={{ mb: 5 }}>
      <MuiBreadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography>
      </MuiBreadcrumbs>
    </Box>

  );
};

export default Breadcrumbs;