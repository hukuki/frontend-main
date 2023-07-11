import React, { useEffect, useState } from 'react';
import styles from './FilterInput.module.css';

export const FilterInput = ({ type, value, placeholder, onChange, className, onSubmit, ...props }) => {
  return (
    <div className={className}>
      <input
        className={styles['input']}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSubmit(value);
        }}
      />
    </div>
  );
};
