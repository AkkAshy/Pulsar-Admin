import { useEffect } from "react";
import { Skeleton, Text } from "@chakra-ui/react";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/providers/StoreProvider/hook";
import { getPatientsStats } from "../model/selectors";
import getPatientsStatsThunk from "../model/thunks/getPatientsStatsThunk";
import StatisticsCard from "@/shared/ui/StatisticsCard";
import { getIsAuthenticated } from "@/entities/auth/model/selectors";

const PatientsStats = () => {
  const { data, loading, error } = useAppSelector(getPatientsStats);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getPatientsStatsThunk());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Text color="white" textAlign="center" p={4}>
        Пожалуйста, войдите в систему для просмотра статистики пациентов.
      </Text>
    );
  }

  if (loading) {
    return (
      <div style={{ backgroundColor: "#0B8892", padding: "16px 16px 0 16px" }}>
        <Skeleton height="24px" width="200px" mb={4} />
        <div style={{ display: "flex", gap: "8px", padding: "8px" }}>
          <Skeleton height="100px" width="200px" />
          <Skeleton height="100px" width="200px" />
          <Skeleton height="100px" width="200px" />
          <Skeleton height="100px" width="200px" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Text color="red.500" textAlign="center" p={4}>
        Ошибка загрузки статистики пациентов: {error}
      </Text>
    );
  }

  return (
    <div style={{ backgroundColor: "#0B8892", padding: "16px 16px 0 16px" }}>
      <Text color="white" fontSize="24px" mb={4}>
        Статистика Пациентов
      </Text>
      <div style={{ display: "flex", gap: "8px", padding: "8px" }}>
        <StatisticsCard title="Всего пациентов" value={data.total_patients} />
        <StatisticsCard title="Новых сегодня" value={data.new_patients_today} />
        <StatisticsCard
          title="Новых за неделю"
          value={data.new_patients_this_week}
        />
        <StatisticsCard
          title="Новых за месяц"
          value={data.new_patients_this_month}
        />
      </div>
    </div>
  );
};

export default PatientsStats;
