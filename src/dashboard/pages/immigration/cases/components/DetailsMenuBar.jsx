import { Button, ButtonGroup, Card, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';


export const DetailsMenuBar = ({ items, countersData, keye }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [counters, setCounters] = useState();
  const navigateTo = (url) => {
    navigate(url);
  };

  const getDataCounters = () => {
    const dataWithCounters = countersData && Object.values(countersData);
    switch (keye) {
      case 'contacts':
        const objCounter = dataWithCounters && [
          {
            comments: { label: t('comments'), value: dataWithCounters[0].comments },
            documents: { label: t('documents'), value: dataWithCounters[0].documents },
            immprofiles: { label: t('immprofiles'), value: dataWithCounters[0].immprofiles },
            invoices: { label: t('invoices'), value: dataWithCounters[0].invoices },
            payments: { label: t('payments'), value: dataWithCounters[0].payments },
            tickets: { label: t('tickets'), value: dataWithCounters[0].tickets },
          },
        ];
        setCounters(objCounter);
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    getDataCounters();
  }, [countersData?.totals,items]);

  return (
    <>
      <ButtonGroup
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',

          boxShadow: 'none',
        }}
        variant='contained'
        aria-label='outlined primary button group'
      >
        {items.map((i, index) => (
          <Button
            key={`${index}_${i.navigateTo}`}
            sx={{
              flex: '1 1 auto',
              minWidth: '100px',
              textAlign: 'center',
            }}
            color='primary'
            size='large'
            onClick={(event) => navigateTo(i.navigateTo)}
            disabled={location.pathname === i.navigateTo}
          >
            {i.icon}
            <Typography sx={{ color: '#fff', paddingLeft: '5px' }}>{i.label}</Typography>
            <Card sx={{ width: '13%', marginLeft: '5px' }}>
              {keye === 'contacts'
                ? counters &&
                  counters.map((item) =>
                    item.comments.label === i.label && item.comments.value !== 0
                      ? item.comments.value
                      : item.documents.label === i.label && item.documents.value !== 0
                      ? item.documents.value
                      : item.immprofiles.label === i.label && item.immprofiles.value !== 0
                      ? item.immprofiles.value
                      : item.invoices.label === i.label && item.invoices.value !== 0
                      ? item.invoices.value
                      : item.payments.label === i.label && item.payments.value !== 0
                      ? item.payments.value
                      : item.tickets.label === i.label && item.tickets.value !== 0
                      ? item.tickets.value
                      : '',
                  )
                : ''}
            </Card>
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
};
