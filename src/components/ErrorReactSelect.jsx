import React from 'react';

export default ({ error, text }) => {
  return (
    error && (
      <small
        style={{
          color: '#d32f2f',
          fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
          fontWeight: 400,
          fontSize: '0.75rem',
          lineHeight: 1.66,
          letterSpacing: '0.03333em',
          textAlign: 'left',
          marginTop: 3,
          marginRight: 14,
          marginBottom: 0,
          marginLeft: 14,
        }}
      >
        {text}
      </small>
    )
  );
};
