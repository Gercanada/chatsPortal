import React, { useState } from 'react';

import imageCompression from 'browser-image-compression';
import { Button, CircularProgress } from '@mui/material';

const defaultImage = '/images/image_placeholder.jpg';

const fileInput = React.createRef();

export default function ImageUpload({
  imagePreviewUrlParam,
  onChangeImage,
  compresseFile = false,
}) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    imagePreviewUrlParam ? imagePreviewUrlParam : defaultImage,
  );

  const handleImageChange = (e) => {
    setLoading(true);
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      if (compresseFile) {
        const options = {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        imageCompression(file, options)
          .then((compressedFile) => {

            let reader = new FileReader();
            reader.onloadend = () => {
              setLoading(false);
              setFile(new File([compressedFile], file.name));
              setImagePreviewUrl(reader.result);
              if (onChangeImage !== undefined) {
                onChangeImage(new File([compressedFile], file.name));
              }
            };
            reader.readAsDataURL(compressedFile);
          })
          .catch(function (error) {
            setLoading(false);
            alert(error.message);
          });
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLoading(false);
          setFile(file);
          setImagePreviewUrl(reader.result);
          if (onChangeImage !== undefined) {
            onChangeImage(file);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleClick = () => {
    fileInput.current.click();
  };
  const handleRemove = () => {
    setFile(null);
    setImagePreviewUrl(defaultImage);
    fileInput.current.value = null;
  };
  /*
  const onImageSave = () => {
    onImageSaveParam(file);
    fileInput.current.value = null;
  };
  */

  return (
    <div className='fileinput text-center'>
      <input
        type='file'
        onChange={handleImageChange}
        ref={fileInput}
        accept='image/x-png,image/gif,image/jpeg'
        style={{ display: 'none' }}
      />
      <div className={'thumbnail'}>
        <img src={imagePreviewUrl} alt='...' style={{ width: 200, borderRadius: 20 }} />
      </div>
      <div>
        {file === null ? (
          loading ? (
            <CircularProgress width='20' />
          ) : (
            <Button color='primary' onClick={handleClick}>
              {'Cargar'}
            </Button>
          )
        ) : (
          <span>
            <div style={{ padding: 5 }}>
              <Button color='secondary' onClick={handleClick} style={{ margin: 5 }}>
                {'Cambiar'}
              </Button>
              <Button
                color='primary'
                onClick={() => handleRemove()}
                style={{ margin: 5, backgroundColor: 'red' }}
              >
                <i className='fas fa-times' />
                {'Eliminar'}
              </Button>
            </div>
          </span>
        )}
      </div>
    </div>
  );
}
