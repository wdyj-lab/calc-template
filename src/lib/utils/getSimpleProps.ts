import HintType from "@/types/HintType";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface SimpleProps<T extends FieldValues = FieldValues> {
  key: keyof T;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  errors: Partial<FieldErrors<T>>;
}

const getSimpleProps = <T extends FieldValues = FieldValues>({
  key,
  setValue,
  watch,
  errors,
}: SimpleProps<T>) => ({
  onChange: (value: any) =>
    setValue(key as Path<T>, value, { shouldValidate: true }),
  value: convertToValue(watch(key as Path<T>)),
  hintType: (errors[key] ? "negative" : "positive") as HintType,
  hintText: errors[key]?.message?.toString(),
});

const convertToValue = <T extends FieldValues = FieldValues>(
  value: UseFormWatch<T>
) => {
  if (value === undefined) return "";
  if (value === null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return value;
  if (typeof value === "boolean") return value;

  return "";
};

export default getSimpleProps;
