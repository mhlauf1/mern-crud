import {
  Image,
  Box,
  Heading,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
  useToast,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { useProductStore } from "../store/product";

const ProductCard = ({ product, key }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Product updated successfuly!",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton
            icon={<MdOutlineEdit />}
            onClick={onOpen}
            colorScheme="blue"
          />
          <IconButton
            icon={<MdDelete />}
            onClick={() => handleDelete(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Input
                value={updatedProduct.name}
                placeholder="Product Name"
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
                name="name"
              />
              <Input
                value={updatedProduct.price}
                placeholder="Price"
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
                name="price"
              />
              <Input
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
                placeholder="Image URL"
                name="iamge"
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              colorScheme="blue"
              mr={3}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Canel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
