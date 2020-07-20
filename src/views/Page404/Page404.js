import React, { Fragment } from 'react';

const Page404 = ({ location }) => {
   return (
      <Fragment>
         <h2>No match found for <code>{location.pathname}</code></h2>
      </Fragment>
   );
};

export default Page404;