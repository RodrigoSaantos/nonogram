import { useControl } from '@/hooks/useControl'
import { FaStop } from 'react-icons/fa'
import { RiCloseFill } from 'react-icons/ri'

export function Control() {
  const { typeSelected, onSetTypeSelected } = useControl()

  const isActiveFilled = typeSelected === 'filled'

  return (
    <div className="flex bg-muted-foreground/30 rounded-full gap-5">
      <div
        className={`flex cursor-pointer rounded-full p-4 ${!isActiveFilled ? 'bg-accent shadow-4xl shadow-muted-foreground' : 'bg-transparent opacity-50'}`}
        onClick={() => onSetTypeSelected('unfilled')}
      >
        <button className="bg-transparent">
          <RiCloseFill aria-label="closeIcon" size={32} />
        </button>
      </div>
      <div
        className={`flex cursor-pointer rounded-full p-4 ${isActiveFilled ? 'bg-accent shadow-4xl shadow-muted-foreground' : 'bg-transparent opacity-50'}`}
        onClick={() => onSetTypeSelected('filled')}
      >
        <button className="bg-transparent" aria-label="FilledIcon">
          <FaStop size={32} />
        </button>
      </div>
    </div>
  )
}
