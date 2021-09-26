import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: ['Titillium Web'].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}));

export default function CustomizedSelects({
  age,
  setAge,
  sexe,
  setSexe,
  evidence,
  setEvidence
}: any) {
  const handleChange = (event: { target: { value: string } }) => {
    setAge(parseInt(event.target.value, 10));
  };
  const handleChangeSexe = (event: { target: { value: string } }) => {
    setSexe(event.target.value);
  };
  const handleChangeEvidence = (event: { target: { value: string } }) => {
    setEvidence(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1 }} variant='standard'>
        <InputLabel
          style={{ fontFamily: 'Titillium Web', fontSize: 20 }}
          htmlFor='demo-customized-textbox'
        >
          Age
        </InputLabel>

        <BootstrapInput
          id='demo-customized-textbox'
          type='number'
          value={age}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl sx={{ m: 1 }} variant='standard'>
        <InputLabel
          htmlFor='demo-customized-select-native'
          style={{ fontFamily: 'Titillium Web', fontSize: 20 }}
        >
          Sexe
        </InputLabel>
        <NativeSelect
          id='demo-customized-select-native'
          value={sexe}
          onChange={handleChangeSexe}
          input={<BootstrapInput />}
        >
          <option aria-label='Sexe' value='Sexe' />
          <option value={'male'}>Male</option>
          <option value={'female'}>Female</option>
        </NativeSelect>
      </FormControl>
      <br />
      <TextareaAutosize
        aria-label='minimum height'
        placeholder='Type in here...'
        style={{
          width: 700,
          marginLeft: 9,
          marginTop: 10,
          minHeight: 45,
          maxHeight: 100,
          padding: 10,
          overflowY: 'scroll',
          fontFamily: 'Titillium Web',
          fontSize: 16,
          borderColor: '#CED4DA',
          borderRadius: 5
        }}
        onChange={handleChangeEvidence}
      />
    </div>
  );
}
