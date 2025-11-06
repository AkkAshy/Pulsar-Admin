import { useEffect } from "react";
import { Skeleton, Text } from "@chakra-ui/react";
import AppointmentStatsView from "./AppointmentStatsView";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/providers/StoreProvider/hook";
import { getAppointmentsStats } from "../model/selectors";
import getStatsThunk from "../model/thunks/getStatsThunk";
import { getIsAuthenticated } from "@/entities/auth/model/selectors";

const AppointmentStats = () => {
  const { data, loading, error } = useAppSelector(getAppointmentsStats);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getStatsThunk());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Text color="white" textAlign="center" p={4}>
        Пожалуйста, войдите в систему для просмотра статистики приемов.
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
        Ошибка загрузки статистики: {error}
      </Text>
    );
  }

  return <AppointmentStatsView data={data} />;
};

export default AppointmentStats;
