import { useState } from 'react';

export function ObjectControl({ value, name, onChange }) {
  const [tempValue, setTempValue] = useState(JSON.stringify(value ?? {}, null, 2));
  return <textarea
    name={name}
    onChange={(e) => setTempValue(e.target.value)}
    value={tempValue}
    onBlur={() => onChange(JSON.parse(tempValue))}
  />;
}