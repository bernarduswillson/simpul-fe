// Libs
import { useState, useEffect, ReactNode, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Interface
interface FlyoutLinkProps {
  children: ReactNode;
  FlyoutContent: (props: { type?: string, isUser?: boolean, onClick?: (type: string) => void }) => JSX.Element
  type?: string
  isUser?: boolean
  onClick?: (type: string) => void;
}

const FlyoutLink = (props: FlyoutLinkProps): JSX.Element => {
  // Props
  const { children, FlyoutContent, type, isUser, onClick } = props;

  // States
  const flyoutRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Hooks
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (flyoutRef.current && !flyoutRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [flyoutRef]);

  return (
    <div className="relative w-full h-full z-10" onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-center w-full h-full">
        {children}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={flyoutRef}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-90%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-[85px] bg-white text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <FlyoutContent type={type} isUser={isUser} onClick={onClick} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlyoutLink;
