"use client";
import { InputHTMLAttributes } from "react";

type Props = {
  label?: string;
  rootClassName?: string;
  inputClassName?: string;
  multiline?: boolean;
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
const InputField = ({
  rootClassName,
  label,
  multiline,
  inputClassName,
  ...props
}: Props) => {
  return (
    <div className={rootClassName ? rootClassName : "flex flex-col gap-2"}>
      <label htmlFor={label} className="text-xs ">
        {label && label[0].toUpperCase() + label.slice(1)}
      </label>
      {multiline ? (
        <textarea {...props} className={inputClassName} />
      ) : (
        <input {...props} className={inputClassName} />
      )}
    </div>
  );
};

export default InputField;
