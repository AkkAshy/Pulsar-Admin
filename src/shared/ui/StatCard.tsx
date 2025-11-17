import { Box, Flex, Text } from "@chakra-ui/react";
import FormatMoney from "@/shared/lib/FormatMoney";
import type { ReactNode } from "react";

type Props = {
  title: string;
  value: number | string;
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
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        {/* Title */}
        <Text fontSize="sm" fontWeight="medium" opacity={0.9}>
          {title}
        </Text>

        {/* Icon */}
        {icon && (
          <Flex
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
      </Flex>

      {/* Value */}
      <Text fontSize="3xl" textAlign={"center"} fontWeight="bold">
        {isMoney ? FormatMoney(Number(value)) : value}
      </Text>
    </Box>
  );
};

export default StatCard;
