import { useEffect, useState } from 'react';
import { immcaseApi } from '../../api';

export const useFetchApiConfig = (config, returnJustData) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const getResponse = async () => {
    if (config) {
      setLoading(true);
      try {
        const res = await immcaseApi(config);
        if (res)
          if (returnJustData) setResponse(res?.data);
          else setResponse(res);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    } else {
      console.error('NOT VALID AXIOS CONFIG');
    }
  };

  /*
  useEffect(() => {
    getResponse();
  }, []);
  */

  return {
    response,
    loading,
    getResponse,
  };
};
