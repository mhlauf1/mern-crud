import React from "react";
import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { GoPlusCircle } from "react-icons/go";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
        >
          <Link to={"/"}> Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <GoPlusCircle size={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
