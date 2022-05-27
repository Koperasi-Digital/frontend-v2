import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent } from 'react';

export type PhoneNumberFieldProps = TextFieldProps & {
  onChange: (value: string) => void;
};

export default function PhoneNumberField({ onChange, ...props }: PhoneNumberFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp('^[0-9]*$');
    if (regex.test(e.currentTarget.value)) {
      onChange(e.currentTarget.value);
    }
  };

  return <TextField {...props} label="Nomor Telepon" onChange={handleChange} />;
}
