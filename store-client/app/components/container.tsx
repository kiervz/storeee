import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className='mx-auto max-w-7xl p-4 sm:p-6'>{children}</div>;
};

export default Container;
