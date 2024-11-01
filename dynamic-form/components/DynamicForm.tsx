import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

interface FormField {
  id: number;
  name: string;
  fieldType: string;
  minLength?: number;
  maxLength?: number;
  defaultValue: string;
  required: boolean;
  listOfValues1?: string[];
}

interface FormValues {
  [key: string]: string;
}

const formData: { data: FormField[] } = {
  data: [
    {
      id: 1,
      name: "Full Name",
      fieldType: "TEXT",
      minLength: 1,
      maxLength: 100,
      defaultValue: "",
      required: true,
    },
    {
      id: 2,
      name: "Email",
      fieldType: "TEXT",
      minLength: 5,
      maxLength: 50,
      defaultValue: "",
      required: true,
    },
    {
      id: 6,
      name: "Gender",
      fieldType: "LIST",
      defaultValue: "",
      required: true,
      listOfValues1: ["Male", "Female"],
    },
    {
      id: 7,
      name: "Love React?",
      fieldType: "RADIO",
      defaultValue: "",
      required: true,
      listOfValues1: ["Yes", "No"],
    },
  ],
};

const DynamicForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      {formData.data.map((field) => (
        <Controller
          key={field.id}
          name={field.name}
          control={control}
          defaultValue={field.defaultValue}
          rules={{
            required: field.required ? `${field.name} is required` : false,
            minLength: field.minLength
              ? {
                  value: field.minLength,
                  message: `${field.name} must be at least ${field.minLength} characters`,
                }
              : undefined,
            maxLength: field.maxLength
              ? {
                  value: field.maxLength,
                  message: `${field.name} cannot exceed ${field.maxLength} characters`,
                }
              : undefined,
          }}
          render={({ field: controllerField }) => {
            switch (field.fieldType) {
              case "TEXT":
                return (
                  <TextField
                    {...controllerField}
                    label={field.name}
                    variant="outlined"
                    error={!!errors[field.name]}
                    helperText={errors[field.name]?.message}
                  />
                );
              case "LIST":
                return (
                  <FormControl error={!!errors[field.name]}>
                    <Select
                      {...controllerField}
                      displayEmpty
                      inputProps={{ "aria-label": `${field.name}` }}
                    >
                      <MenuItem value="">Select {field.name}</MenuItem>
                      {field.listOfValues1?.map((value, index) => (
                        <MenuItem key={index} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {errors[field.name]?.message}
                    </FormHelperText>
                  </FormControl>
                );
              case "RADIO":
                return (
                  <FormControl
                    component="fieldset"
                    error={!!errors[field.name]}
                  >
                    <RadioGroup {...controllerField}>
                      {field.listOfValues1?.map((value, index) => (
                        <FormControlLabel
                          key={index}
                          value={value}
                          control={<Radio />}
                          label={value}
                        />
                      ))}
                    </RadioGroup>
                    <FormHelperText>
                      {errors[field.name]?.message}
                    </FormHelperText>
                  </FormControl>
                );
              default:
                return <></>;
            }
          }}
        />
      ))}
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default DynamicForm;
