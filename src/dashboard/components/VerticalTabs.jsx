import { Button, Grid, Typography } from '@mui/material';
import { Path } from '@react-pdf/renderer';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { getCasesTabs } from '../../store/slices/immvisas/cases/thunks';

const VerticalTabs = ({ title, id, path, setShowTabs, setIds }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [tabsValues, setTabsValues] = useState();
  const [sizeData, setSizeData] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { loading, casesToShow } = useSelector((state) => state.immvisasCases);

  const handleOnclick = useCallback(
    (ids, index) => {
      setSelectedIndex(index);
      setIds(ids);
      setShowTabs(true);
    },
    [setSelectedIndex, setIds, setShowTabs],
  );

  const onLoad =  async() => {
   
    //   console.log('cases',casesToShow)
    //   if(casesToShow){
    // if (casesToShow?.data?.length === 0) {
    //   setSizeData(casesToShow?.data?.length);
    // } else {
    //   setSizeData(casesToShow?.data?.length);
    // }
    // setTabsValues(casesToShow?.data)
    //   }
    const res = await dispatch(getCasesTabs(id, path));
    if (res?.data?.length === 0) {
      setSizeData(res?.data.length);
    } else {
      setSizeData(res?.data.length);
    }
    setTabsValues(res?.data);
  };


 
  useEffect(() => {
    if (tabsValues && tabsValues.length > 0) {
      setIds(tabsValues[0].id);
      setShowTabs(true);
    }
  }, [tabsValues]);

  useEffect(() => {
    dispatch(getCasesTabs(id, path));
  }, []);

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <Grid
      item
      sx={loading ? { display: 'none' } :{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '10px',
        marginTop: '5px',
        marginLeft: '5px',
        }}
     
    >
      {tabsValues && sizeData > 0 ? (
        tabsValues.map((item, index) => (
          <Button
            variant='contained'
            key={index}
            name={item?.cf_1199}
            disabled={selectedIndex === index}
            onClick={() => {
              handleOnclick(item?.id, index);
            }}
            sx={{ border: '1px solid black', color: selectedIndex === index ? 'white' : 'black' }}
          >
            <Typography variant='p' sx={{ color: selectedIndex === index ? 'white' : 'black' }}>
              {' '}
              {`Checklist ${item?.applicant_full_name}`}
            </Typography>
          </Button>
        ))
      ) : (
        <Typography variant='h6' sx={{ textAlign: 'center', paddingLeft: '20px' }}>
          No checklist
        </Typography>
      )}
      {loading && <Loader />}
    </Grid>
  );
};

export default VerticalTabs;
