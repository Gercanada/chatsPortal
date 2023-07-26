import { useState, useEffect } from 'react';

export const InputFile = () => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file) {
      console.log('File has been set.');
    }
  }, [file]);
  return (
    <>
      <input type='file' onChange={(e) => setFile(e.target.files[0])} value={''} />
    </>
  );
};
