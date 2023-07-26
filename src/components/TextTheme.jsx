import React from 'react';
import { useSelector } from 'react-redux';

export default ({ children }) => {
  const { isLightTheme } = useSelector((state) => state.ui);
  return <div style={{ color: isLightTheme ? 'black' : 'white' }}>{children}</div>;
};
