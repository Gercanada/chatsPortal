import { useEffect, useState } from 'react';
import { immcaseApi } from '../../api';

export const useFetchApi = (route, params) => {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);

  const setColumns = (fields) => {
    const columns = [];
    fields.forEach((field) => {
      columns.push({
        title: field?.label,
        field: `${field?.table}.${field?.name}`,
      });
    });
    return columns;
  };

  const getResponse = async () => {
    try {
      setLoading(true);
      const res = await immcaseApi.get(route);

      if (route.split('/')[3] === 'create') {
        setResponse(
          res?.data
            ? {
                data: res.data,
              }
            : {
                data: [],
              },
        );
      } else if (route.split('/').length > 3 && route.split('/')[3].match(/^select.*$/)) {
        setResponse(res?.data);
      } else {
        if (res?.data?.object) {
          setResponse(
            res?.data
              ? {
                  data: res.data,
                }
              : {
                  data: res,
                },
          );
        } else {
          if ('fields_tags' in res?.data) {
            setResponse(
              res?.data
                ? {
                    columns: setColumns(res?.data?.fields_tags),
                    data: res?.data?.response?.data.map((i) => ({
                      ...i,
                    })),
                    page: res.data.pagination.current_page - 1,
                    totalCount: res.data.pagination.total,
                  }
                : {
                    data: res?.data,
                  },
            );
          } else {
            // alert('her');
            setResponse(res?.data);
            console.log({ res });
          }
        }
      }
      setLoading(false);
    } catch (error) {
      setResponse(error.response);
      console.error(error);
      setLoading(false);
    }
  };

  const getResponseWithQuery = async (query) => {
    const { page, pageSize } = query;
    const url = `resource/tickets?page=${page + 1}&perpage=${pageSize}`;

    const config = {
      method: 'get',
      url,
    };

    const res = await immcaseApi.get(route);
    if (res?.data) {
      return {
        columns: setColumns(res?.data?.fields_tags),
        data: res?.data?.response?.data.map((i) => ({
          ...i,
        })),
        page: res.data.pagination.current_page - 1,
        totalCount: res.data.pagination.total,
      };
    }
    return {
      data: [],
      page: 0,
      totalCount: 0,
    };
  };

  useEffect(() => {
    getResponse();
  }, []);

  return {
    response,
    loading,
    getResponse,
    getResponseWithQuery,
  };
};
