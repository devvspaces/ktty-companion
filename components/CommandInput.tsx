'use client';

import { useState } from 'react';

export default function CommandInput({
  onSubmit,
}: {
  onSubmit: (cmd: string) => void;
}) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="block">
        <span className="text-gold mr-2">{'>'}</span>
        <input
          autoFocus
          className="bg-transparent text-holy-white outline-none w-full caret-gold"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
    </form>
  );
}
