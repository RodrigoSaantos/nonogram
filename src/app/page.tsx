import { Screen } from '@/components/Screen'
import { ModeToggle } from '@/components/modo-toogle'

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col">
      <header className="flex justify-end px-4 mt-2">
        <ModeToggle />
      </header>
      <Screen />
    </div>
  )
}
