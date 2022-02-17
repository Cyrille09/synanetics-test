import React from 'react';
import styles from './footer.module.scss';

function Footer() {
  const date = new Date();

  return (
    <div className={styles.footer}>
      <div className="container d-md-flex py-4">
        <div className="mr-md-auto text-center text-md-left">
          <div className="copyright">
            Copyright &copy; {date.getFullYear()}{' '}
            <strong>
              <span>Synanetics</span>
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
