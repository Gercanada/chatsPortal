import { Button, CircularProgress } from '@mui/material';

export default function CButton({ children, loading, ...otherProps }) {
  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <CircularProgress />
      </div>
    );
  }

  return <Button {...otherProps}>{children}</Button>;
}
