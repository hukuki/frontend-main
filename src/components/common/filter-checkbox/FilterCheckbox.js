import React, { useState } from 'react';

import styles from './FilterCheckbox.module.css';
import { CheckIcon } from '@chakra-ui/icons';

export const FilterCheckbox = ({ label, isChecked, ...props }) => {
  const defaultChecked = isChecked || false;
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className={styles['container']}>
      <div className={styles['input-container']} onClick={() => setChecked((prev) => !prev)}>
        <input className={checked && styles['checked']} type="checkbox" checked={checked} />
        {checked && <CheckIcon color="primary.900" className={styles['check-icon']} />}
      </div>
      <span className={styles['checkbox-label']}>{label}</span>
    </div>
  );
};
