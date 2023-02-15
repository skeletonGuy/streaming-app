import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const CopyableTextField = ({ value }) => {
  const [copySuccess, setCopySuccess] = React.useState('');
  const handleCopy = (e) => {
    navigator.clipboard.writeText(value);
    setCopySuccess('Copied!');

    setTimeout(() => {
      setCopySuccess('');
    }, 500);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        value={value}
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
        style={{ flex: .75, }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCopy}
        style={{ marginLeft: 10 }}
      >
        Copy
      </Button>
      <p style={{ marginLeft: 10 }}>{copySuccess}</p>
    </div>);
};
export default CopyableTextField;