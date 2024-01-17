'use client'
import { useControl } from '@/hooks/useControl'
import party from 'party-js'
import { useRef } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { Canvas } from '../Canvas'
import { Control } from '../Control'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../ui/dialog'
import { Button } from '../ui/button'

const Hearts = () => {
  const { lives } = useControl()
  const heartIcons = Array(3)
    .fill({})
    .map((_, i) => {
      return (
        <AiFillHeart
          className={`${i < lives ? 'text-red-500' : 'text-gray-500'}`}
          size={52}
          key={i}
        />
      )
    })
  return <div className="flex">{heartIcons}</div>
}

export function Screen() {
  const { lives, onReset, completedPuzzle, board } = useControl()
  const modalRef = useRef<HTMLDivElement | null>(null)

  if (completedPuzzle && modalRef.current) {
    party.confetti(modalRef.current, {
      count: 100,
    })
  }

  return (
    <main
      className="flex h-full flex-col gap-8 justify-center items-center"
      ref={modalRef}
    >
      <Hearts />
      <Canvas />
      <Control />
      <Dialog open={!lives}>
        <DialogContent hiddenCloseButton className="w-80">
          <DialogHeader className="flex items-center font-bold text-xl">
            Sem Vidas!
          </DialogHeader>
          <div>
            <div className="flex flex-col gap-8 justify-center items-center h-40">
              <AiFillHeart size={52} className="text-red-500" />
              <Button onClick={onReset}>Recomeçar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={completedPuzzle}>
        <DialogContent hiddenCloseButton className="w-80">
          <DialogHeader className="items-center font-bold text-xl">
            Nível completado!
          </DialogHeader>
          <div>
            <div className="flex flex-col gap-8 justify-center items-center">
              <div className="grid grid-cols-10 border-spacing-2">
                {board.map((grid, index) => {
                  return (
                    <div
                      className={`w-4 h-4 ${grid ? 'bg-gray-500' : 'bg-transparent'}`}
                      key={index}
                    />
                  )
                })}
              </div>
            </div>
          </div>
          <DialogFooter className="justify-center sm:justify-center">
            <Button onClick={onReset}>Próximo Nível</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
