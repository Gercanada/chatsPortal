import React from 'react';
import { useSelector } from 'react-redux';
import ReactSelect from 'react-select';

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: 'gray' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    // const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isSelected ? '#a6ce39' : isFocused ? '#313131' : '#272727',
      color: isDisabled ? '#ccc' : isSelected ? 'white' : 'white',
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled ? (isSelected ? '#a6ce39' : '#a6ce39') : undefined,
      },
    };
  },
  input: (styles) => ({ ...styles, color: 'white' }),
  placeholder: (styles) => ({ ...styles, color: 'white' }),
  singleValue: (styles, { data }) => ({ ...styles, color: 'white' }),
};

const WrappedComponent1 = (props) => {
  const { isLightTheme } = useSelector((state) => state.ui);
  if (isLightTheme) return <ReactSelect {...props} />;
  else return <ReactSelect {...props} styles={colourStyles} />;
};

// export default WrappedComponent1;

const WrappedComponent = React.forwardRef((props, ref) => {
  return <WrappedComponent1 {...props} forwardedRef={ref} />;
});

export default WrappedComponent;
