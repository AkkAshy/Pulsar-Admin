import { Box, Flex, Text } from "@chakra-ui/react";
import FormatMoney from "@/shared/lib/FormatMoney";

type Props = {
  title: string;
  value: number;
  isMoney?: boolean;
};
const StatisticsCard = ({ title, value, isMoney = false }: Props) => {
  return (
    <Box flex={1} padding={2} rounded={4} backgroundColor={"white"}>
      <Text>{title}</Text>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Text fontSize={24} color={"#0E6470"} fontWeight={"bold"} padding={4}>
          {isMoney ? FormatMoney(value) : value}
        </Text>
      </Flex>
    </Box>
  );
};

export default StatisticsCard;
