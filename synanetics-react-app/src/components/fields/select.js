import React from 'react';
import { useField } from 'formik';
import classnames from 'classnames';

import styles from './fields.module.scss';

export function Select({
  name,
  id,
  placeholder = 'Please select',
  label,
  options,
  disabled,
  option,
  onChange,
  className = null,
}) {
  const [field, meta, helpers] = useField(name);
  const isInvalid = meta.error && meta.touched;

  return (
    <div className={classnames(styles.field, className)}>
      {label && (
        <label htmlFor={id || name} className={styles.label}>
          {label}
        </label>
      )}
      <select
        {...field}
        //id={id || name}
        id={id}
        name={name}
        onChange={(event) => {
          // Call the formik onChange handler first!
          field.onChange(event);
          // Call custom onChange after
          if (onChange) {
            onChange(event);
          }
        }}
        className={classnames(
          styles.input,
          styles.select,
          isInvalid && styles.invalid
        )}
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {option}
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {isInvalid && <p className={styles.error}>{meta.error}</p>}
    </div>
  );
}
