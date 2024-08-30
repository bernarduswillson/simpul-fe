// Libs
import { motion, AnimatePresence, m } from 'framer-motion'

// Interface
interface ModalProps {
  onClose: () => void,
  isOpen: boolean,
  width?: string,
  children: React.ReactNode,
}


const Modal = (props: ModalProps): JSX.Element => {
  // Props
  const { onClose, isOpen, width, children} = props

  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed z-50 backdrop-blur inset-0 flex items-center justify-center bg-scrim rounded-xl"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.2 }
          }}
        >
          <div className="fixed w-full h-full inset-0" onClick={onClose} />

          <motion.div
            className="w-11/12 p-5 pt-10 bg-neutral-100 border-2 rounded-md flex flex-col items-center z-50"
            style={{ maxWidth: width || '500px' }}
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

export default Modal;
