import { useControl } from '@/hooks/useControl'
import { FaStop } from 'react-icons/fa'
import { RiCloseFill } from 'react-icons/ri'
import { AnimatePresence, motion } from 'framer-motion'

export function Control() {
  const { typeSelected, onSetTypeSelected } = useControl()

  const isActiveFilled = typeSelected === 'filled'
  console.log(isActiveFilled)

  return (
    <div className="flex w-36 h-16 bg-muted-foreground/30 rounded-full justify-between">
      <div
        className={`
        flex relative cursor-pointer size-16 justify-center items-center
        
        `}
        onClick={() => onSetTypeSelected('unfilled')}
      >
        <AnimatePresence>
          {!isActiveFilled && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="block w-16 h-16 bg-accent absolute top-0 left-0 rounded-full z-10 shadow-xl"
            />
          )}
        </AnimatePresence>
        <button className="absolute z-20">
          <RiCloseFill aria-label="closeIcon" size={32} />
        </button>
      </div>
      <div
        className={`
          flex relative cursor-pointer size-16 justify-center items-center
        `}
        onClick={() => onSetTypeSelected('filled')}
      >
        <AnimatePresence>
          {isActiveFilled && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="block w-16 h-16 bg-accent absolute top-0 left-0 rounded-full z-10 shadow-xl"
            />
          )}
        </AnimatePresence>
        <button className="absolute z-20" aria-label="FilledIcon">
          <FaStop size={32} />
        </button>
      </div>
    </div>
  )
}
