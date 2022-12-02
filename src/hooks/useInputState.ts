import React, { ChangeEvent, useState } from 'react';

export default (initialState: string): [string, (e: ChangeEvent<HTMLInputElement>) => void, React.Dispatch<React.SetStateAction<string>>] => {
  const [state, setState] = useState<string>(initialState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  return [state, onChange, setState];
}