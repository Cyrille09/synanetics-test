import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import classnames from 'classnames';

export function Page({ title = '', className = '', children }) {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title key="title">{title ? `${title}` : 'Synanetics'}</title>
        </Helmet>
      </HelmetProvider>
      <div className="container">
        <div className="row">
          <div className="col-12 layout-content">
            <main className={classnames(className)}>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
