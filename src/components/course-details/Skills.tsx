import { DbSkill } from "@/types";
import { IoMdCheckmark } from "react-icons/io";
type Props = {
  skills: DbSkill[];
};
const Skills = ({ skills }: Props) => {
  return (
    <div className="flex flex-col gap-4 p-5 border-[1px] border-purple-200 rounded-sm">
      <h2 className="font-bold text-lg">What you'll learn</h2>
      <section className="grid grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center  gap-4">
            <span className="text-purple-600 text-sm">
              <IoMdCheckmark />
            </span>
            <p className="text-sm">{skill.content}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Skills;
