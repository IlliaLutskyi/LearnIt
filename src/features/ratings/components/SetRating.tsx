"use client";
import api from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isAxiosError, isCancel } from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { toast } from "sonner";

type Props = {
  sectionId: number | null;
};
const Rating = ({ sectionId }: Props) => {
  const [stars, setStars] = useState([
    { number: 1, isHovered: false, isClicked: false },
    { number: 2, isHovered: false, isClicked: false },
    { number: 3, isHovered: false, isClicked: false },
    { number: 4, isHovered: false, isClicked: false },
    { number: 5, isHovered: false, isClicked: false },
  ]);

  const controller = useRef<AbortController>(null);
  const { data: sectionRating } = useQuery({
    queryKey: ["sectionRating", sectionId],
    queryFn: async () => {
      const res = await api.get(`/sections/ratings/${sectionId}`, {
        withCredentials: true,
      });
      return res.data;
    },
    enabled: !!sectionId,
  });
  const mutation = useMutation({
    mutationFn: async (rating: number) => {
      if (!sectionId) return;

      controller.current = new AbortController();

      const res = await api.post(
        `/sections/ratings`,
        {
          sectionId,

          rating,
        },
        { signal: controller.current.signal, withCredentials: true }
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (err: unknown) => {
      if (isCancel(err)) return;
      if (isAxiosError(err))
        return toast.error(err.response?.data.message, { duration: 5000 });
    },
  });

  useEffect(() => {
    if (sectionRating && sectionRating.rating) {
      setStars(
        stars.map((s) => {
          if (s.number <= sectionRating.rating) {
            return { ...s, isClicked: true };
          } else {
            return { ...s, isClicked: false };
          }
        })
      );
    }
  }, [sectionRating]);

  function highlightStars(star: number) {
    setStars(
      stars.map((s) => {
        if (s.number <= star) {
          return { ...s, isHovered: true };
        } else {
          return { ...s, isHovered: false };
        }
      })
    );
  }
  function unhighlightStars() {
    setStars(
      stars.map((s) => {
        return { ...s, isHovered: false };
      })
    );
  }
  function selectStar(star: number) {
    setStars(
      stars.map((s) => {
        if (s.number <= star) {
          return { ...s, isClicked: true };
        } else {
          return { ...s, isClicked: false };
        }
      })
    );
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <p className="text-xs">Rate this section:</p>
      <section className="flex ">
        {stars.map((star) => {
          return (
            <button
              onMouseEnter={() => highlightStars(star.number)}
              onMouseLeave={() => unhighlightStars()}
              onClick={() => {
                controller.current?.abort();
                selectStar(star.number);
                mutation.mutate(star.number);
              }}
              key={star.number}
              className="cursor-pointer p-2"
            >
              {star.isHovered || star.isClicked ? (
                <FaStar className="text-accent" />
              ) : (
                <CiStar />
              )}
            </button>
          );
        })}
      </section>
    </div>
  );
};
export default Rating;
