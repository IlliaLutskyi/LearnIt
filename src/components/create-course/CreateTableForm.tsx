import { Table } from "@/types/create-course";
import { useState } from "react";
import BlurBackground from "../common/BlurBackground";
import InputField from "../common/InputField";
type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const CreateTableForm = ({ isOpen, setIsOpen }: Props) => {
  const [table, setTable] = useState<Table>();
  function handleChangeValue(
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) {
    if (!table || !table.rows) return;
    setTable({
      rows: table.rows.map((row) => {
        if (row.id === id) return { ...row, content: e.target.value };
        return row;
      }),
    });
  }
  function addColumn() {}
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <>
      <BlurBackground />
      <form onSubmit={onSubmit}>
        <h1>Create Quiz</h1>
        <section>
          {!table && <p>No table yet</p>}
          {table &&
            table.rows.map((row) => {
              return (
                <div>
                  <InputField multiline value={row.content} />
                </div>
              );
            })}
        </section>
      </form>
    </>
  );
};

export default CreateTableForm;
