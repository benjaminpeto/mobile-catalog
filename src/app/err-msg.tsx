import React from 'react';

const ErrorMsg = ({ error }: { error: string }) => {
  return <p data-testid="TEST_ID">{error}</p>;
};

export default ErrorMsg;
