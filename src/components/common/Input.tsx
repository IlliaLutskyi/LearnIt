import React, { InputHTMLAttributes } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { useId } from "react";
type Props<T extends FieldValues> = {
  label?: string;
  multiline?: boolean;
  field?: Path<T>;
  register?: UseFormRegister<T>;
  error?: string;
  divClassName?: string;
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
const Input = <T extends FieldValues>({
  label,
  register,
  field,
  divClassName,
  multiline = false,
  error,
  ...props
}: Props<T>) => {
  const id = useId();
  return (
    <div className={divClassName ? divClassName : "flex flex-col gap-1"}>
      <label htmlFor={id} className="text-xs">
        {label ? label[0].toUpperCase() + label.slice(1) : ""}
      </label>
      <div className="flex flex-col gap-1">
        {multiline ? (
          <textarea
            {...(register && field ? { ...register(field) } : "")}
            {...props}
            id={id}
          />
        ) : (
          <input
            {...(register && field ? { ...register(field) } : "")}
            {...props}
            id={id}
          />
        )}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Input;
