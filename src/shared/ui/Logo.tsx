import { Flex, Heading } from "@chakra-ui/react";
import { GiMedicalPackAlt } from "react-icons/gi";

type LogoSize = "xs" | "sm" | "md";

type LogoProps = {
  size?: LogoSize;
};

const Logo = ({ size = "sm" }: LogoProps) => {
  return (
    <Flex gap={3} alignItems={"center"}>
      <GiMedicalPackAlt size={ReturnSize(size)} color="teal" />
      <Heading size="2xl" color="teal.600" _dark={{ color: "teal.400" }}>
        Pulsar
      </Heading>
    </Flex>
  );
};

function ReturnSize(size: LogoSize) {
  switch (size) {
    case "xs":
      return "20";
    case "sm":
      return "40";
    case "md":
      return "60";
  }
}

export default Logo;
