import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import classnames from 'classnames';

export function Page({ title = '', navigate = '', className = '', children }) {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title key="title">{title ? `${title}` : 'Synanetics'}</title>
        </Helmet>
      </HelmetProvider>
      <div className="content-wrapper">
        <div>
          <section className="content top-layout">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title">{navigate}</div>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12">
                          <main className={classnames(className)}>
                            {children}
                          </main>
                        </div>
                      </div>
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.card */}
                  {/* /.card */}
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </section>
          {/* /.content */}
        </div>
      </div>
    </>
  );
}
