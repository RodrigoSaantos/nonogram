import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

type TypeSelect = 'filled' | 'unfilled'

type ControlContextData = {
  typeSelected: TypeSelect;
  onSetTypeSelected: (type: TypeSelect) => void
};

type ControlProviderProps = {
  children: ReactNode;
};

const ControlContext = createContext<ControlContextData>(
  {} as ControlContextData
);

export function ControlProvider({ children }: ControlProviderProps) {
  const [typeSelected, setTypeSelected] = useState<TypeSelect>('filled')

  const onSetTypeSelected = useCallback((type: TypeSelect) => {
    setTypeSelected(type)
  }, []);

  return (
    <ControlContext.Provider
      value={{
        onSetTypeSelected,
        typeSelected,
      }}
    >
      {children}
    </ControlContext.Provider>
  );
}

export function useControl(): ControlContextData {
  return useContext(ControlContext);
}
