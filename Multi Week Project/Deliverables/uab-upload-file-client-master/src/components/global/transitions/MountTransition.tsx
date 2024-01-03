"use client";

import { Variant } from "@/constants/transitions.constants";
import { AnimatePresence, motion } from "framer-motion";

type MountTransitionProps = {
  children?: React.ReactNode;
  className?: string | undefined;
  duration?: number;
};

const MountTransition = (props: MountTransitionProps) => {
  const { className, children, duration = undefined } = props;
  return (
    <AnimatePresence>
      <motion.div
        layout
        variants={Variant.FADE}
        initial="hidden"
        animate="visible"
        transition={{ duration: duration }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default MountTransition;
