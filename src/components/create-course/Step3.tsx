import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  addSkill,
  setNextStep,
  setPreviousStep,
} from "@/lib/slices/CreateCourseSlice";
import Skill from "./Skill";
type Props = {
  step: { step: number; title: string; active: boolean };
};
const Step3 = ({ step }: Props) => {
  const { skills } = useAppSelector((state) => state.CreateCourse);
  function handleAction(next: boolean) {
    if (next) {
      dispatch(setNextStep({ currentStep: step.step }));
    } else {
      dispatch(setPreviousStep({ currentStep: step.step }));
    }
  }
  function handleAddPreriquisite() {
    dispatch(addSkill());
  }
  const dispatch = useAppDispatch();
  return (
    <div className="h-full flex flex-col gap-4 p-4">
      <h1 className="font-bold text-lg self-center">{step.title}</h1>

      <div className="grow flex flex-col gap-2">
        <section className="flex justify-end">
          <button
            className="self-end mt-4 bg-purple-500 text-white px-4 py-2 focus:scale-95 rounded-sm hover:bg-purple-700 duration-500"
            onClick={handleAddPreriquisite}
          >
            Add skill
          </button>
        </section>

        <section
          className="flex flex-col gap-4 overflow-y-auto h-[18rem] p-3"
          id="scrollbar"
        >
          {skills.length === 0 && (
            <p className="text-center text-sm">No skills</p>
          )}

          {skills.map((skill) => (
            <Skill key={skill.id} id={skill.id} content={skill.content} />
          ))}
        </section>
      </div>

      <div className="flex gap-4 justify-between items-center">
        <button
          className="self-end mt-4 bg-purple-500 text-white px-4 py-2 focus:scale-95 rounded-sm hover:bg-purple-700 duration-500"
          onClick={() => handleAction(false)}
        >
          Back
        </button>
        <button
          onClick={() => handleAction(true)}
          className="self-end mt-4 bg-purple-500 text-white px-4 py-2 focus:scale-95 rounded-sm hover:bg-purple-700 duration-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3;
