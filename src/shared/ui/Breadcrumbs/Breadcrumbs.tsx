import { Typography, Breadcrumbs as MuiBreadcrumbs, Link, Box } from "@mui/material";
import { FC, Fragment } from "react";

type BreadCrumbItem = {
  label: string
  to?: string,
  isCurrentPage?: boolean
}

type Props = {
  items: BreadCrumbItem[]
}

const Breadcrumbs: FC<Props> = ({ items }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <MuiBreadcrumbs aria-label="breadcrumb">
        {items.map(({ label, isCurrentPage, to }, index) => {
          if (!to) {
            return <Typography key={index} sx={{ color: 'text.primary' }}>{label}</Typography>
          }
          return (
            <Fragment key={index}>
              {isCurrentPage ? <Typography sx={{ color: 'text.primary' }}>{label}</Typography> : <Link underline="hover" color="inherit" href={to}>{label}</Link>}
            </Fragment>
          )
        })}
      </MuiBreadcrumbs>
    </Box>

  );
};

export default Breadcrumbs;