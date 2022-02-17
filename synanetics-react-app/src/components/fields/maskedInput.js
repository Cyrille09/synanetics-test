import React from 'react';
import { useField } from 'formik';
import classnames from 'classnames';
import InputMask from 'react-input-mask';

import styles from './fields.module.scss';

export function MaskedInput({
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
  mask,
  maskChar,
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
      <InputMask
        {...field}
        type={type}
        id={id}
        name={name}
        mask={mask}
        maskChar={maskChar}
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
