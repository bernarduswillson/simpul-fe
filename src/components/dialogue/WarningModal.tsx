// Libs
import { motion, AnimatePresence } from 'framer-motion'

// Interface
interface WarningModalProps {
  onClose: () => void,
  isOpen: boolean,
  children: React.ReactNode,
}

const WarningModal = (props: WarningModalProps): JSX.Element => {
  const {
    onClose,
    isOpen,
    children
  } = props

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed z-50 backdrop-blur inset-0 flex items-center justify-center bg-scrim rounded-lg"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.2 }
          }}
        >
          <div className="fixed w-full h-full inset-0" onClick={onClose} />

          <motion.div
            className="max-w-[500px] w-11/12 p-5 pt-10 bg-neutral-100 border-2 rounded-md flex flex-col items-center z-50"
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{
              scale: 1,
              rotate: '0deg',
              transition: { duration: 0.3, ease: 'backOut' }
            }}
            exit={{
              scale: 0,
              rotate: '0deg',
              transition: { duration: 0.3, ease: 'backIn' }
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
};

export default WarningModal;
