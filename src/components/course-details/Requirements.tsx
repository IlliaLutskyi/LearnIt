import { DbPrerequisite } from "@/types";

type Props = {
  preriquisites: DbPrerequisite[];
};
const Requirements = ({ preriquisites }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2 list-disc pl-8">
        {preriquisites.map((preriquisite) => (
          <li key={preriquisite.id}>
            <p className="text-sm">{preriquisite.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Requirements;
