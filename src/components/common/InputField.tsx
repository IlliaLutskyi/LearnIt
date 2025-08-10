"use client";
import React, { memo } from "react";

type Props = {
  label?: string;
  type?: string;
  placeholder?: string;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  value?: string;
  rootClassName?: string;
  inputClassName?: string;
  multiline?: boolean;
  defaultValue?: string;
  name?: string;
  checked?: boolean;
};
const InputField = ({
  label,
  type = "text",
  inputClassName,
  placeholder,
  onChange,
  name,
  defaultValue,
  rootClassName,
  value,
  checked,
  multiline = false,
}: Props) => {
  return (
    <div className={rootClassName ? rootClassName : "flex flex-col gap-1"}>
      <label htmlFor={label} className="text-sm">
        {label && label[0].toUpperCase() + label.slice(1)}
      </label>
      {multiline ? (
        <textarea
          name={name}
          id={label}
          className={inputClassName}
          onChange={onChange}
          value={value}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={label}
          defaultValue={defaultValue}
          checked={checked}
          onChange={onChange}
          value={value}
          className={inputClassName}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default InputField;
