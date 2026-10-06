import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { isPrerenderedBoot } from "@/lib/prerenderBoot";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  // On a prerendered first load the page is already painted — don't hide it.
  const [skipEnter] = useState(isPrerenderedBoot);
  return (
    <motion.div
      initial={skipEnter ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
