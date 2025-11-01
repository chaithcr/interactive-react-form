export interface FieldConfig {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  rows?: number;
  allowedFileTypes?: string[];
}

export interface DynamicFormProps {
  fields: FieldConfig[];
  onSubmit: (data: any) => void;
}
