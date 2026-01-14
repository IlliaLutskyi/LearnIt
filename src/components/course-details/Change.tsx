import React from "react";

type Props = {
  title: string;
  changeType?: string;
};
const Change = ({ changeType, title }: Props) => {
  return (
    <div
      className={`flex justify-between items-center gap-2 ring-1 ${
        changeType === "create" || changeType === "update"
          ? "ring-success"
          : "ring-error"
      } p-2 rounded-sm`}
    >
      <p className="font-bold text-sm">{title}</p>

      <span
        className={`p-1 text-xs rounded-sm ${
          changeType === "update" || changeType === "create"
            ? "bg-success"
            : "bg-error"
        }`}
      >
        {changeType}
      </span>
    </div>
  );
};

export default Change;
