import { DbSkill } from "@/types";
import { IoMdCheckmark } from "react-icons/io";
type Props = {
  skills: DbSkill[];
};
const Skills = ({ skills }: Props) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {skills.map((skill) => (
        <div key={skill.id} className="flex items-center gap-4">
          <span className="text-accent text-sm">
            <IoMdCheckmark />
          </span>
          <p className="text-sm">{skill.content}</p>
        </div>
      ))}
    </section>
  );
};

export default Skills;
