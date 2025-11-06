import { Box, Flex, Text } from "@chakra-ui/react";
import FormatMoney from "@/shared/lib/FormatMoney";
import type { ReactNode } from "react";

type Props = {
  title: string;
  value: number;
  isMoney?: boolean;
  icon?: ReactNode;
  bgColor?: string;
  iconBgColor?: string;
};

const StatCard = ({
  title,
  value,
  isMoney = false,
  icon,
  bgColor = "cyan.500",
  iconBgColor = "cyan.600",
}: Props) => {
  return (
    <Box
      flex={1}
      minW="200px"
      p={6}
      rounded="xl"
      backgroundColor={bgColor}
      _dark={{ backgroundColor: bgColor }}
      color="white"
      position="relative"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
    >
      {/* Icon */}
      {icon && (
        <Flex
          position="absolute"
          top={4}
          right={4}
          w={12}
          h={12}
          alignItems="center"
          justifyContent="center"
          backgroundColor={iconBgColor}
          rounded="lg"
          fontSize="24px"
        >
          {icon}
        </Flex>
      )}

      {/* Title */}
      <Text fontSize="sm" fontWeight="medium" mb={3} opacity={0.9}>
        {title}
      </Text>

      {/* Value */}
      <Text fontSize="3xl" fontWeight="bold">
        {isMoney ? FormatMoney(value) : value}
      </Text>
    </Box>
  );
};

export default StatCard;
