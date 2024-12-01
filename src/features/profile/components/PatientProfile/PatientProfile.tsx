import { FC } from "react";
import { PatientProfileData } from "../../utils/types";
import { Card } from "../../../../shared/ui/components";
import { Avatar, Stack, Typography } from "@mui/material";

type Props = {
  data: PatientProfileData
}

const PatientProfile: FC<Props> = ({ data }) => {

  if (!data) return null;


  return (
    <Stack direction="column" spacing={4}>
      <Card sx={{ p: '31px 20px' }}>

        <Stack direction={'row'} spacing={3} >
          <Avatar sx={{ bgcolor: 'orange', width: 100, height: 100 }}>N</Avatar>
          <Stack direction={'column'} sx={{ mt: 3 }}>
            <Typography sx={{ fontSize: "20px", color: "#434966", mb: 1 }}>{`${data?.personalData.name} ${data?.personalData.lastName}`}</Typography>
            <Typography sx={{ fontSize: "18px", color: "#82889C" }}>{data?.pesel}</Typography>
            <Typography sx={{ fontSize: "14px", color: "#82889C" }}>{data.age}</Typography>
            <Typography sx={{ fontSize: "14px", color: "#82889C" }}>{data.contactData.email}</Typography>
            <Typography sx={{ fontSize: "14px", color: "#82889C" }}>{data.contactData.phone}</Typography>
          </Stack>
        </Stack>
      </Card>
    </Stack >
  );
};

export default PatientProfile;