
import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  username: string;
};

export default function ChakraTest() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    alert(`Submitted!\nEmail: ${data.email}\nUsername: ${data.username}`);
  };

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={4}
      align="stretch"
      maxW="400px"
      mx="auto"
      mt={10}
    >
      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.username}>
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="Enter your username"
          {...register("username", { required: "Username is required" })}
        />
        <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
      </FormControl>

      <Button type="submit" colorScheme="teal">
        Submit
      </Button>
    </VStack>
  );
}
