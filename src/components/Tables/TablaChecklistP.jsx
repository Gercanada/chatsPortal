import React from 'react'
import { getPagination } from '../../store/slices/pagination/thunks';

export const TablaChecklistP = () => {

    const response = dispatch(getPagination(path, 100));
      const data = response?.data;
  return (
    <>

    </>
  )
}
