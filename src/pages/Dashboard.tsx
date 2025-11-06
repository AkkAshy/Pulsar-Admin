import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Grid,
  Text,
  Flex,
  Skeleton,
  Table,
  Button,
} from "@chakra-ui/react";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/providers/StoreProvider/hook";
import { getAppointmentsStats } from "@/entities/appointmentStats/model/selectors";
import { getPatientsStats } from "@/entities/patientsStats/model/selectors";
import getAppointmentsStatsThunk from "@/entities/appointmentStats/model/thunks/getStatsThunk";
import getPatientsStatsThunk from "@/entities/patientsStats/model/thunks/getPatientsStatsThunk";
import StatCard from "@/shared/ui/StatCard";
import FormatMoney from "@/shared/lib/FormatMoney";
import {
  FaUsers,
  FaCalendarCheck,
  FaSearch,
  FaBolt,
  FaUser,
  FaWalking,
  FaUserPlus,
  FaChartLine,
  FaThumbsUp,
  FaStar,
  FaDollarSign,
  FaCheckCircle,
} from "react-icons/fa";
import { ColorModeButton } from "@/components/ui/color-mode";
import { useNavigate } from "react-router";
import { getIsAuthenticated } from "@/entities/auth/model/selectors";
import api from "@/shared/api/axios";

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

const Dashboard = () => {
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

  if (
    loading ||
    appointmentsStats.loading ||
    patientsStats.loading
  ) {
    return (
      <Box minH="100vh" bg="gray.50" _dark={{ bg: "gray.900" }}>
        <Container maxW="1400px" py={8}>
          <Skeleton height="40px" width="300px" mb={8} />
          <Grid templateColumns="repeat(4, 1fr)" gap={6} mb={8}>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} height="140px" rounded="xl" />
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

  return (
    <Box minH="100vh" bg="gray.50" _dark={{ bg: "gray.900" }}>
      {/* Header */}
      <Box
        bg="white"
        _dark={{ bg: "gray.800", borderColor: "gray.700" }}
        shadow="sm"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Container maxW="1400px" py={4}>
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={3}>
              <Box bg="teal.100" _dark={{ bg: "teal.900" }} p={2} rounded="lg">
                <Text
                  fontSize="24px"
                  color="teal.600"
                  _dark={{ color: "teal.400" }}
                >
                  +
                </Text>
              </Box>
              <Heading size="lg" color="teal.600" _dark={{ color: "teal.400" }}>
                Pulsar
              </Heading>
            </Flex>
            <Flex gap={4} align="center">
              <Button variant="ghost" size="sm" onClick={() => navigate("/main")}>
                Dashboard
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("/charts")}>
                Grafikler
              </Button>
              <Button variant="ghost" size="sm">
                Hisobotlar
              </Button>
              <ColorModeButton />
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Container maxW="1400px" py={8}>
        {/* Qabilawlar statistikasi */}
        <Box mb={8}>
          <Heading
            size="lg"
            mb={6}
            color="blue.600"
            _dark={{ color: "blue.400" }}
          >
            Qabilawlar statistikasi
          </Heading>
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <StatCard
              title="Ulwma qabilawlar sani"
              value={appointmentsStats.data.total_appointments}
              icon={<FaUsers />}
              bgColor="teal.400"
            />
            <StatCard
              title="Juwmaqlang'an qabilawlar sani"
              value={appointmentsStats.data.completed_appointments}
              icon={<FaCalendarCheck />}
              bgColor="teal.400"
            />
            <StatCard
              title="Ku'tilip atirg'an qabilawlar sani"
              value={appointmentsStats.data.pending_appointments}
              icon={<FaSearch />}
              bgColor="teal.400"
            />
            <StatCard
              title="Natiyjelik darejesi"
              value={`${appointmentsStats.data.completion_rate}%`}
              icon={<FaBolt />}
              bgColor="purple.400"
              isMoney={false}
            />
          </Grid>
        </Box>

        {/* Patsientler statistikasi */}
        <Box mb={8}>
          <Heading
            size="lg"
            mb={6}
            color="blue.600"
            _dark={{ color: "blue.400" }}
          >
            Patsientler statistikasi
          </Heading>
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <StatCard
              title="Ulwma patsientler sani"
              value={patientsStats.data.total_patients}
              icon={<FaUser />}
              bgColor="blue.300"
            />
            <StatCard
              title="Bugungi taza patsientler"
              value={patientsStats.data.new_patients_today}
              icon={<FaWalking />}
              bgColor="green.300"
            />
            <StatCard
              title="Heptelik taza patsientler"
              value={patientsStats.data.new_patients_this_week}
              icon={<FaUserPlus />}
              bgColor="yellow.300"
            />
            <StatCard
              title="Aylik taza patsientler"
              value={patientsStats.data.new_patients_this_month}
              icon={<FaChartLine />}
              bgColor="purple.300"
            />
          </Grid>
        </Box>

        {/* Finansliq statistika - ТВОИ РЕАЛЬНЫЕ ДАННЫЕ */}
        <Box mb={8}>
          <Heading
            size="lg"
            mb={6}
            color="blue.600"
            _dark={{ color: "blue.400" }}
          >
            Finansliq statistika
          </Heading>
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <StatCard
              title="Ulwmaliq daramat"
              value={Number(financialStats.total_revenue)}
              icon={<FaThumbsUp />}
              bgColor="blue.300"
              isMoney={true}
            />
            <StatCard
              title="Sap daramat"
              value={Number(financialStats.completed_revenue)}
              icon={<FaStar />}
              bgColor="blue.300"
              isMoney={true}
            />
            <StatCard
              title="Ku'tilip atirg'an daramat"
              value={Number(financialStats.pending_revenue)}
              icon={<FaDollarSign />}
              bgColor="blue.300"
              isMoney={true}
            />
            <StatCard
              title="Bir qabilaw o'rtasha summasi"
              value={Number(financialStats.average_appointment_cost)}
              icon={<FaCheckCircle />}
              bgColor="blue.300"
              isMoney={true}
            />
          </Grid>
        </Box>

        {/* Waqit bo'yinsha finans statistikasi - ТВОИ РЕАЛЬНЫЕ ДАННЫЕ */}
        <Box mb={8}>
          <Heading
            size="lg"
            mb={6}
            color="blue.600"
            _dark={{ color: "blue.400" }}
          >
            Waqit bo'yinsha finans statistikasi
          </Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <StatCard
              title="Kunlik daramat"
              value={Number(financialStats.revenue_today)}
              bgColor="green.300"
              isMoney={true}
            />
            <StatCard
              title="Heptelik daramat"
              value={Number(financialStats.revenue_this_week)}
              bgColor="green.300"
              isMoney={true}
            />
            <StatCard
              title="Ayliq daramat"
              value={FormatMoney(Number(financialStats.revenue_this_month))}
              bgColor="green.300"
              isMoney={true}
            />
          </Grid>
        </Box>

        {/* Patsientlar ha'm qabilawlar statistikasi - Таблица */}
        <Box mb={8} bg="blue.50" _dark={{ bg: "blue.900" }} p={6} rounded="xl">
          <Heading
            size="md"
            mb={4}
            color="blue.600"
            _dark={{ color: "blue.300" }}
          >
            Patsientlar ha'm qabilawlar statistikasi
          </Heading>
          <Box
            bg="white"
            _dark={{ bg: "gray.800" }}
            rounded="lg"
            overflow="hidden"
          >
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row bg="gray.50" _dark={{ bg: "gray.700" }}>
                  <Table.ColumnHeader>Ulwma Statistika</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="right">Sani</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>patsientler</Table.Cell>
                  <Table.Cell textAlign="right">
                    {patientsStats.data.total_patients}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>qabillaw</Table.Cell>
                  <Table.Cell textAlign="right">
                    {appointmentsStats.data.total_appointments}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>doktorlar</Table.Cell>
                  <Table.Cell textAlign="right">
                    {doctorsStats.length}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>juwmaqlang'an qabilawlar</Table.Cell>
                  <Table.Cell textAlign="right">
                    {appointmentsStats.data.completed_appointments}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>ku'tilip atirg'an qabilawlar</Table.Cell>
                  <Table.Cell textAlign="right">
                    {appointmentsStats.data.pending_appointments}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>jana patsientler bugungi</Table.Cell>
                  <Table.Cell textAlign="right">
                    {patientsStats.data.new_patients_today}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>natiyjelik darejesi</Table.Cell>
                  <Table.Cell textAlign="right">
                    {appointmentsStats.data.completion_rate}%
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Box>

        {/* Shipakerler statistikasi - ТВОИ РЕАЛЬНЫЕ ДАННЫЕ */}
        <Box>
          <Heading
            size="lg"
            mb={6}
            color="blue.400"
            _dark={{ color: "blue.300" }}
          >
            Shipakerler statistikasi
          </Heading>
          {doctorsStats.length > 0 ? (
            <Grid
              templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
              gap={6}
            >
              {doctorsStats.map((doctor, index) => {
                const colors = [
                  "blue.300",
                  "green.300",
                  "yellow.300",
                  "purple.300",
                  "orange.300",
                  "pink.300",
                ];
                return (
                  <Box
                    key={doctor.doctor_id}
                    bg={colors[index % colors.length]}
                    p={6}
                    rounded="xl"
                    shadow="md"
                    _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
                    transition="all 0.3s"
                  >
                    <Heading size="md" mb={4} color="white" textAlign="center">
                      {doctor.doctor_name}
                    </Heading>
                    <Box>
                      <Flex justify="space-between" mb={2}>
                        <Text color="white" fontSize="sm">
                          Ulwma qabilawlar
                        </Text>
                        <Text color="white" fontWeight="bold">
                          {doctor.total_appointments}
                        </Text>
                      </Flex>
                      <Flex justify="space-between" mb={2}>
                        <Text color="white" fontSize="sm">
                          Juwmaqlang'an qabilawlar sani
                        </Text>
                        <Text color="white" fontWeight="bold">
                          {doctor.completed_appointments}
                        </Text>
                      </Flex>
                      <Flex justify="space-between" mb={2}>
                        <Text color="white" fontSize="sm">
                          Ku'tilip atirg'an qabilawlar
                        </Text>
                        <Text color="white" fontWeight="bold">
                          {doctor.pending_appointments}
                        </Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text color="white" fontSize="sm">
                          Natiyjelik darejesi
                        </Text>
                        <Text color="white" fontWeight="bold">
                          {doctor.completion_rate}%
                        </Text>
                      </Flex>
                    </Box>
                  </Box>
                );
              })}
            </Grid>
          ) : (
            <Text textAlign="center" color="gray.500">
              Нет данных о врачах
            </Text>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;