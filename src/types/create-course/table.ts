import z from "zod";

export const RowSchema = z.record(z.string(), z.unknown());

export const TableSchema = z.array(RowSchema);

export type Row = z.infer<typeof RowSchema>;
