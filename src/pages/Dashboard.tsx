import { useEffect } from "react";
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

const Dashboard = () => {
  const appointmentsStats = useAppSelector(getAppointmentsStats);
  const patientsStats = useAppSelector(getPatientsStats);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAppointmentsStatsThunk());
    dispatch(getPatientsStatsThunk());
  }, [dispatch]);

  const loading = appointmentsStats.loading || patientsStats.loading;

  if (loading) {
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

  return (
    <Box minH="100vh" bg="gray.50" _dark={{ bg: "gray.900" }}>
      {/* Header */}
      <Box
        bg="white"
        _dark={{ bg: "gray.800" }}
        shadow="sm"
        borderBottom="1px"
        borderColor="gray.200"
        _dark={{ borderColor: "gray.700" }}
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
              <Button variant="ghost" size="sm">
                Tab
              </Button>
              <Button variant="ghost" size="sm">
                Tab
              </Button>
              <Button variant="ghost" size="sm">
                Tab
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

        {/* Finansliq statistika */}
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
              value={FormatMoney(50000000)}
              icon={<FaThumbsUp />}
              bgColor="blue.300"
            />
            <StatCard
              title="Sap daramat"
              value={FormatMoney(5000000)}
              icon={<FaStar />}
              bgColor="blue.300"
            />
            <StatCard
              title="Ku'tilip atirg'an daramat"
              value={FormatMoney(500000)}
              icon={<FaDollarSign />}
              bgColor="blue.300"
            />
            <StatCard
              title="Bir qabilaw o'rtasha summasi"
              value={FormatMoney(50000)}
              icon={<FaCheckCircle />}
              bgColor="blue.300"
            />
          </Grid>
        </Box>

        {/* Waqit bo'yinsha finans statistikasi */}
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
              value={FormatMoney(350000)}
              bgColor="green.300"
            />
            <StatCard
              title="Heptelik daramat"
              value={FormatMoney(11000000)}
              bgColor="green.300"
            />
            <StatCard
              title="Ayliq daramat"
              value={FormatMoney(60000000)}
              bgColor="green.300"
            />
          </Grid>
        </Box>

        {/* Patsientlar ha'm qabilawlar statistikasi - Table */}
        <Box mb={8} bg="blue.50" _dark={{ bg: "blue.900" }} p={6} rounded="xl">
          <Heading
            size="md"
            mb={4}
            color="blue.600"
            _dark={{ color: "blue.300" }}
          >
            Patsientlar ha'm qabilawlar statistikasi
          </Heading>
          <Box bg="white" _dark={{ bg: "gray.800" }} rounded="lg" overflow="hidden">
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row bg="gray.50" _dark={{ bg: "gray.700" }}>
                  <Table.ColumnHeader>Ulwma Statistika</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="right">
                    Sani
                  </Table.ColumnHeader>
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
                  <Table.Cell textAlign="right">28</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>bugungi qabilawlar</Table.Cell>
                  <Table.Cell textAlign="right">24</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>bugun qabillaw tawsilg'an</Table.Cell>
                  <Table.Cell textAlign="right">24</Table.Cell>
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

        {/* Shipakerler statistikasi */}
        <Box>
          <Heading
            size="lg"
            mb={6}
            color="blue.400"
            _dark={{ color: "blue.300" }}
          >
            Shipakerler statistikasi
          </Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {/* Doctor 1 */}
            <Box bg="blue.300" p={6} rounded="xl" shadow="md">
              <Heading size="md" mb={4} color="white" textAlign="center">
                Logoped
                <br />
                Arziev Aziz
              </Heading>
              <Box>
                <Flex justify="space-between" mb={2}>
                  <Text color="white" fontSize="sm">
                    Ulwma qabilawlar
                  </Text>
                  <Text color="white" fontWeight="bold">
                    350
                  </Text>
                </Flex>
                <Flex justify="space-between" mb={2}>
                  <Text color="white" fontSize="sm">
                    Juwmaqlang'an qabilawlar sani
                  </Text>
                  <Text color="white" fontWeight="bold">
                    224
                  </Text>
                </Flex>
                <Flex justify="space-between" mb={2}>
                  <Text color="white" fontSize="sm">
                    Ku'tilip atirg'an qabilawlar
                  </Text>
                  <Text color="white" fontWeight="bold">
                    15
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="white" fontSize="sm">
                    Natiyjelik darejesi
                  </Text>
                  <Text color="white" fontWeight="bold">
                    75%
                  </Text>
                </Flex>
              </Box>
            </Box>

            {/* Doctor 2 */}
            <Box bg="green.300" p={6} rounded="xl" shadow="md">
              <Heading size="md" mb={4} color="white" textAlign="center">
                Ginekolog
                <br />
                Alieva Aziza
              </Heading>
              <Box>
                <Flex justify="space-between" mb={2}>
                  <Text color="white" fontSize="sm">
                    Ulwma qabilawlar
                  </Text>
                  <Text color="white" fontWeight="bold">
                    450
                  </Text>
                </Flex>
                <Flex justify="space-between" mb={2}>
                  <Text color="white" fontSize="sm">
                    Juwmaqlang'an qabilawlar sani
                  </Text>
                  <Text color="white" fontWeight="bold">
                    294
                  </Text>
                </Flex>
                <Flex justify="space-between" mb={2}>
                  <Text color="white" fontSize="sm">
                    Ku'tilip atirg'an qabilawlar
                  </Text>
                  <Text color="white" fontWeight="bold">
                    18
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="white" fontSize="sm">
                    Natiyjelik darejesi
                  </Text>
                  <Text color="white" fontWeight="bold">
                    85%
                  </Text>
                </Flex>
              </Box>
            </Box>

            {/* Doctor 3 */}
            <Box bg="yellow.300" p={6} rounded="xl" shadow="md">
              <Heading size="md" mb={4} color="white" textAlign="center">
                Xirurg
                <br />
                Aliev Sarvar
              </Heading>
              <Box>
                <Flex justify="space-between" mb={2}>
                  <Text color="white" fontSize="sm">
                    Ulwma qabilawlar
                  </Text>
                  <Text color="white" fontWeight="bold">
                    350
                  </Text>
                </Flex>
                <Flex justify="space-between" mb={2}>
                  <Text color="white" fontSize="sm">
                    Juwmaqlang'an qabilawlar sani
                  </Text>
                  <Text color="white" fontWeight="bold">
                    224
                  </Text>
                </Flex>
                <Flex justify="space-between" mb={2}>
                  <Text color="white" fontSize="sm">
                    Ku'tilip atirg'an qabilawlar
                  </Text>
                  <Text color="white" fontWeight="bold">
                    15
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="white" fontSize="sm">
                    Natiyjelik darejesi
                  </Text>
                  <Text color="white" fontWeight="bold">
                    85%
                  </Text>
                </Flex>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
