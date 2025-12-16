"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DbCategory } from "@/types";
import CategoryMenu from "./CategoryMenu";
type Props = {
  categories: DbCategory[] | undefined;
};
const CategoryTable = ({ categories }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories?.map((category) => (
          <TableRow key={category.id}>
            <TableCell>
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                width={50}
                height={100}
                className="aspect-square rounded-sm"
              />
            </TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell className="flex justify-center">
              <CategoryMenu category={category} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
