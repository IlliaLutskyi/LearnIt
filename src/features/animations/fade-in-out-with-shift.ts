import { Variants } from "framer-motion";
export const fadeInOutWithShiftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: {
      duration: 0.3,
    },
  },
};
