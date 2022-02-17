import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import styles from './button.module.scss';

export const Button = ({
  format = 'primary',
  href = null,
  to = null,
  type = 'button',
  children,
  onClick,
  disabled = false,
  target = null,
  small = false,
  classNameActive = null,
}) => {
  if (href && target) {
    return (
      <a
        href={href}
        target={target}
        className={classnames(
          styles.btn,
          'btn',
          styles[format],
          small && styles.small
        )}
        onClick={onClick}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link
        to={to}
        className={classnames(
          styles.btn,
          'btn',
          styles[format],
          small && styles.small,
          classNameActive
        )}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classnames(
        styles.btn,
        'btn',
        styles[format],
        small && styles.small
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
