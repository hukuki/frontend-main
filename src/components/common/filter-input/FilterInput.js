import React, { useEffect, useState } from 'react';
import styles from './FilterInput.module.css';

export const FilterInput = ({ type, placeholder, className, ...props }) => {
  const [value, setValue] = useState(null);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={className}>
      <input className={styles['input']} type={type} placeholder={placeholder} onChange={handleInputChange} value={value} />
    </div>
  );
};
