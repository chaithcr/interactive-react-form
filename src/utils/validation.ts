import * as yup from "yup";
import { FieldConfig } from "../types/formTypes";

export const createValidationSchema = (fields: FieldConfig[]) => {
  const shape: Record<string, yup.AnySchema> = {};

  fields.forEach((field) => {
    let validator: yup.AnySchema;

    switch (field.type) {
      case "text":
      case "textArea":
      case "location":
      case "select":
        validator = yup.string();
        break;

      case "fileUpload":
        validator = yup
          .mixed<FileList>()
          .test("fileType", "Unsupported file format", (value) => {
            if (!value || value.length === 0) return true; // optional
            const allowed = field.allowedFileTypes || [];
            return allowed.includes(value[0].type);
          });
        break;

      default:
        validator = yup.mixed();
        break;
    }

    if (field.required) {
      validator = validator.required(`${field.label} is required`);
    }

    shape[field.name] = validator;
  });

  return yup.object().shape(shape);
};
