import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Grid,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/providers/StoreProvider/hook";
import { getAppointmentsStats } from "@/entities/appointmentStats/model/selectors";
import { getPatientsStats } from "@/entities/patientsStats/model/selectors";
import getAppointmentsStatsThunk from "@/entities/appointmentStats/model/thunks/getStatsThunk";
import getPatientsStatsThunk from "@/entities/patientsStats/model/thunks/getPatientsStatsThunk";
import { useNavigate } from "react-router";
import { getIsAuthenticated } from "@/entities/auth/model/selectors";
import api from "@/shared/api/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ===== ТИПЫ ИЗ ТВОЕГО API =====
interface FinancialStats {
  total_revenue: string;
  completed_revenue: string;
  pending_revenue: string;
  average_appointment_cost: string;
  revenue_today: string;
  revenue_this_week: string;
  revenue_this_month: string;
}

interface DoctorStats {
  doctor_id: number;
  doctor_name: string;
  total_appointments: number;
  completed_appointments: number;
  pending_appointments: number;
  completion_rate: number;
}

const ChartsPage = () => {
  const appointmentsStats = useAppSelector(getAppointmentsStats);
  const patientsStats = useAppSelector(getPatientsStats);
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // State для финансовой статистики и врачей
  const [financialStats, setFinancialStats] = useState<FinancialStats>({
    total_revenue: "0",
    completed_revenue: "0",
    pending_revenue: "0",
    average_appointment_cost: "0",
    revenue_today: "0",
    revenue_this_week: "0",
    revenue_this_month: "0",
  });
  const [doctorsStats, setDoctorsStats] = useState<DoctorStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    const fetchAllStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Загружаем базовую статистику
        await Promise.all([
          dispatch(getAppointmentsStatsThunk()),
          dispatch(getPatientsStatsThunk()),
        ]);

        // Загружаем финансовую статистику - используем ТВОЙ endpoint
        const financialResponse = await api.get<FinancialStats>(
          "/stats/financial"
        );
        setFinancialStats(financialResponse.data);

        // Загружаем статистику врачей - используем ТВОЙ endpoint
        const doctorsResponse = await api.get<DoctorStats[]>("/stats/doctors");
        setDoctorsStats(doctorsResponse.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setError("Ошибка загрузки статистики");
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, [dispatch, isAuthenticated, navigate]);

  if (loading || appointmentsStats.loading || patientsStats.loading) {
    return (
      <Box minH="100vh" bg="gray.50" _dark={{ bg: "gray.900" }}>
        <Container maxW="1400px" py={8}>
          <Skeleton height="40px" width="300px" mb={8} />
          <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={8}>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} height="300px" rounded="xl" />
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box minH="100vh" bg="gray.50" _dark={{ bg: "gray.900" }} p={8}>
        <Container maxW="1400px">
          <Text color="red.500" fontSize="xl" textAlign="center">
            {error}
          </Text>
        </Container>
      </Box>
    );
  }

  // Данные для графиков
  const appointmentData = [
    {
      name: "Qabilawlar",
      total: appointmentsStats.data.total_appointments,
      completed: appointmentsStats.data.completed_appointments,
      pending: appointmentsStats.data.pending_appointments,
    },
  ];

  const patientData = [
    {
      name: "Bugun",
      patients: patientsStats.data.new_patients_today,
    },
    {
      name: "Hafta",
      patients: patientsStats.data.new_patients_this_week,
    },
    {
      name: "Oy",
      patients: patientsStats.data.new_patients_this_month,
    },
  ];

  const revenueData = [
    {
      name: "Bugun",
      revenue: Number(financialStats.revenue_today),
    },
    {
      name: "Hafta",
      revenue: Number(financialStats.revenue_this_week),
    },
    {
      name: "Oy",
      revenue: Number(financialStats.revenue_this_month),
    },
  ];

  const doctorPieData = doctorsStats.map((doctor) => ({
    name: doctor.doctor_name,
    value: doctor.total_appointments,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <>
      <Container maxW="1400px" py={8}>
        {/* Qabilawlar statistikasi - Bar Chart */}
        <Box mb={8}>
          <Heading
            size="lg"
            mb={6}
            color="blue.600"
            _dark={{ color: "blue.400" }}
          >
            Qabilawlar statistikasi
          </Heading>
          <Box
            bg="white"
            _dark={{ bg: "gray.800" }}
            p={6}
            rounded="xl"
            shadow="md"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={appointmentData}
                onClick={(data) => console.log("Bar clicked:", data)}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="total"
                  fill="#8884d8"
                  name="Ulwma"
                  onClick={(data) => console.log("Total bar clicked:", data)}
                />
                <Bar
                  dataKey="completed"
                  fill="#82ca9d"
                  name="Juwmaqlang'an"
                  onClick={(data) =>
                    console.log("Completed bar clicked:", data)
                  }
                />
                <Bar
                  dataKey="pending"
                  fill="#ffc658"
                  name="Ku'tilip atirg'an"
                  onClick={(data) => console.log("Pending bar clicked:", data)}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Patsientler statistikasi - Line Chart */}
        <Box mb={8}>
          <Heading
            size="lg"
            mb={6}
            color="blue.600"
            _dark={{ color: "blue.400" }}
          >
            Patsientler statistikasi
          </Heading>
          <Box
            bg="white"
            _dark={{ bg: "gray.800" }}
            p={6}
            rounded="xl"
            shadow="md"
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={patientData}
                onClick={(data) => console.log("Line chart clicked:", data)}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="patients"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="Yangi patsientler"
                  onClick={(data) => console.log("Line clicked:", data)}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Finansliq statistika - Line Chart */}
        <Box mb={8}>
          <Heading
            size="lg"
            mb={6}
            color="blue.600"
            _dark={{ color: "blue.400" }}
          >
            Finansliq statistika
          </Heading>
          <Box
            bg="white"
            _dark={{ bg: "gray.800" }}
            p={6}
            rounded="xl"
            shadow="md"
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={revenueData}
                onClick={(data) => console.log("Revenue chart clicked:", data)}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="Daramat"
                  onClick={(data) => console.log("Revenue line clicked:", data)}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Shipakerler statistikasi - Pie Chart */}
        <Box mb={8}>
          <Heading
            size="lg"
            mb={6}
            color="blue.600"
            _dark={{ color: "blue.400" }}
          >
            Shipakerler statistikasi
          </Heading>
          <Box
            bg="white"
            _dark={{ bg: "gray.800" }}
            p={6}
            rounded="xl"
            shadow="md"
          >
            <ResponsiveContainer width="100%" height={400}>
              <PieChart
                onClick={(data) => console.log("Pie chart clicked:", data)}
              >
                <Pie
                  data={doctorPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  onClick={(data) => console.log("Pie slice clicked:", data)}
                >
                  {doctorPieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ChartsPage;
