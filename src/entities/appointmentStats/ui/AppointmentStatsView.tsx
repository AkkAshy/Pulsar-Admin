import { Box, Flex, Heading } from "@chakra-ui/react";
import type { AppointmentStats } from "../model/types";
import StatisticsCard from "@/shared/ui/StatisticsCard";

type Props = {
  data: AppointmentStats;
};
const AppointmentStatsView = ({ data }: Props) => {
  return (
    <Box backgroundColor={"#0B8892"} pt={4} px={4}>
      <Heading color={"white"}>Статистика Приемов</Heading>
      <Flex padding={2} gap={2}>
        <StatisticsCard title="Всего приёмов" value={data.total_appointments} />
        <StatisticsCard
          title="Завершённые приёмы"
          value={data.completed_appointments}
        />
        <StatisticsCard
          title="Ожидающие приёмы"
          value={data.pending_appointments}
        />
        <StatisticsCard
          title="Процент завершения"
          value={data.completion_rate}
        />
      </Flex>
    </Box>
  );
};

export default AppointmentStatsView;
