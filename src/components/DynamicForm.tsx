import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldConfig, DynamicFormProps } from "../types/formTypes";
import { createValidationSchema } from "../utils/validation";
import MapPicker from "./MapPicker";

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {
  const validationSchema = createValidationSchema(fields);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const renderField = (field: FieldConfig) => {
    const error = errors[field.name];

    switch (field.type) {
      case "text":
        return (
          <FormControl key={field.name} isInvalid={!!error} mb={4}>
            <FormLabel>{field.label}</FormLabel>
            <Input {...register(field.name)} placeholder={field.label} />
            <FormErrorMessage>{error?.message as string}</FormErrorMessage>
          </FormControl>
        );

      case "textArea":
        return (
          <FormControl key={field.name} isInvalid={!!error} mb={4}>
            <FormLabel>{field.label}</FormLabel>
            <Textarea
              {...register(field.name)}
              rows={field.rows || 3}
              placeholder={field.label}
            />
            <FormErrorMessage>{error?.message as string}</FormErrorMessage>
          </FormControl>
        );

      case "select":
        return (
          <FormControl key={field.name} isInvalid={!!error} mb={4}>
            <FormLabel>{field.label}</FormLabel>
            <Select {...register(field.name)}>
              <option value="">Select {field.label}</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{error?.message as string}</FormErrorMessage>
          </FormControl>
        );

      case "fileUpload":
        return (
          <FormControl key={field.name} isInvalid={!!error} mb={4}>
            <FormLabel>{field.label}</FormLabel>
            <Input
              type="file"
              {...register(field.name)}
              accept={field.allowedFileTypes?.join(",")}
            />
            <FormErrorMessage>{error?.message as string}</FormErrorMessage>
          </FormControl>
        );

      case "location":
        return (
          <FormControl key={field.name} isInvalid={!!error} mb={4}>
            <FormLabel>{field.label}</FormLabel>
            <MapPicker
              value=""
              onChange={(val) => setValue(field.name, val, { shouldValidate: true })}
            />
            <FormErrorMessage>{error?.message as string}</FormErrorMessage>
          </FormControl>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      maxW="700px"
      mx="auto"
      mt={8}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      {fields.map((f) => renderField(f))}
      <Button colorScheme="blue" type="submit" w="full">
        Submit
      </Button>
    </Box>
  );
};

export default DynamicForm;
