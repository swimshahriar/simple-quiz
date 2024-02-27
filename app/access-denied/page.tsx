import { routes } from '@/config/routes';
import Link from 'next/link';
import React from 'react';

const AccessDeniedPage = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center py-6">
      <h1 className="text-6xl text-center font-bold uppercase text-error">
        403
      </h1>
      <h2 className="text-4xl text-center font-bold uppercase">
        You are not authorized to view the page!
      </h2>

      <Link className="btn btn-primary" href={routes.home}>
        Home Page
      </Link>
    </div>
  );
};

export default AccessDeniedPage;
