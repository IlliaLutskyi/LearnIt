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
} from "@/lib/slices/ConfirmationFormSlice";
const ConfirmationForm = () => {
  const isOpen = useAppSelector((store) => store.ConfirmationForm.isOpen);
  const dispatch = useAppDispatch();

  const { category, description, sections, title } = useAppSelector(
    (store) => store.CreateCourse
  );
  const { data: session } = useSession();
  async function handleCreate() {
    dispatch(setIsLoading(true));
    dispatch(toggleConfirmationForm(false));
    try {
      const course = {
        title,
        category: {
          id: category,
        },
        userId: session?.user.id,
        description,
        sections,
      };
      const res = await api.post("/course", course, { withCredentials: true });
      toast.success(res.data.message, { duration: 5000 });
    } catch (err) {
      if (isAxiosError(err))
        return toast.error(err.response?.data.message, { duration: 5000 });
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
          <div className="flex flex-col gap-6 absolute top-[40%] left-1/2 translate-x-[-50%] translate-y-[-50%] p-10 w-1/2 bg-white rounded-sm">
            <h1 className="text-lg text-center">
              Are you sure, you want to create this course?
            </h1>
            <section className="flex justify-between">
              <button
                onClick={handleClose}
                className="px-3 py-2 text-white text-sm bg-red-500 hover:scale-95 duration-500 focus:scale-95"
              >
                No
              </button>
              <button
                onClick={handleCreate}
                className="px-3 py-2 text-white text-sm bg-green-500 hover:scale-95 duration-500 focus:scale-95"
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
