"use client";
import BlurBackground from "../common/BlurBackground";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import {
  setIsLoading,
  toggleConfirmationForm,
} from "@/lib/slices/confirmation-form-slice";
const ConfirmationForm = () => {
  const isOpen = useAppSelector((store) => store.ConfirmationForm.isOpen);
  const dispatch = useAppDispatch();

  const {
    category,
    description,
    sectionGroups,
    title,
    slug,
    prerequisites,
    skills,
  } = useAppSelector((store) => store.CreateCourse);
  const { data: session } = useSession();
  async function handleCreate() {
    dispatch(setIsLoading(true));
    dispatch(toggleConfirmationForm(false));
    try {
      const course = {
        title,
        slug,
        category: {
          id: category,
        },
        userId: session?.user.id,
        description,
        skills,
        prerequisites,
        sectionGroups,
      };
      const res = await api.post("/courses", course, {
        withCredentials: true,
      });
      toast.success(res.data.message, { duration: 5000 });
    } catch (err) {
      if (isAxiosError(err))
        return toast.error(err.response?.data.message, { duration: 3000 });
    } finally {
      dispatch(setIsLoading(false));
    }
  }
  function handleClose() {
    dispatch(toggleConfirmationForm(false));
  }
  return (
    <>
      {isOpen && (
        <>
          <BlurBackground />
          <div className="flex flex-col gap-6 absolute top-[40%] left-1/2 translate-x-[-50%] translate-y-[-50%] min-h-[200px] p-10 w-1/2 bg-white rounded-sm">
            <h1 className="grow text-lg text-center font-medium">
              Are you sure, you want to create this course?
            </h1>
            <section className="flex justify-between items-end">
              <button
                onClick={handleClose}
                className="px-3 py-2 text-red-500 border-[1px] border-red-600  hover:bg-red-400 hover:text-white text-sm hover:scale-95 duration-500 focus:scale-95 rounded-sm"
              >
                No
              </button>
              <button
                onClick={handleCreate}
                className="px-3 py-2 text-green-500 text-sm border-[1px] border-green-600 hover:bg-green-400 hover:text-white hover:scale-95 duration-500 focus:scale-95 rounded-sm"
              >
                Yes
              </button>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default ConfirmationForm;
