import AppointmentStats from "@/entities/appointmentStats/ui/AppointmentsStats";
import PatientsStats from "@/entities/patientsStats/ui/PatientsStats";
import { Box } from "@chakra-ui/react";

const MainPage = () => {
  return (
    <Box>
      <AppointmentStats />
      <PatientsStats />
    </Box>
  );
};

export default MainPage;
