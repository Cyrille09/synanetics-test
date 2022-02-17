import React from 'react';
import { useField } from 'formik';
import classnames from 'classnames';

import styles from './fields.module.scss';

export function Input({
  type,
  name,
  id,
  placeholder,
  label,
  disabled,
  className = null,
  min,
  required,
  max,
}) {
  // return field name for an <input />
  const [field, meta, helpers] = useField(name);
  const isInvalid = meta.error && meta.touched;

  return (
    <div className={classnames(styles.field, className)}>
      {label && (
        <label htmlFor={id || name} className={styles.label}>
          {label} {}
          {required}
        </label>
      )}
      <input
        {...field}
        type={type}
        id={id}
        name={name}
        className={classnames(styles.input, isInvalid && styles.invalid)}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
      />
      {isInvalid && <p className={styles.error}>{meta.error}</p>}
    </div>
  );
}
