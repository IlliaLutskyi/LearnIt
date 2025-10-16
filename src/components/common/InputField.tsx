"use client";
import { InputHTMLAttributes } from "react";

type Props = {
  label?: string;
  rootClassName?: string;
  inputClassName?: string;
  multiline?: boolean;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
const InputField = ({
  rootClassName,
  label,
  multiline,
  inputClassName,
  errorMessage,
  ...props
}: Props) => {
  return (
    <div className={rootClassName ? rootClassName : "flex flex-col gap-2"}>
      <label htmlFor={label} className="text-sm">
        {label && label[0].toUpperCase() + label.slice(1)}
      </label>
      <div className="flex flex-col">
        {multiline ? (
          <textarea {...props} className={inputClassName} />
        ) : (
          <input {...props} className={inputClassName} />
        )}
        {errorMessage && (
          <p className="text-xs text-red-500 ml-1 mt-1">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default InputField;
