import React from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import { Input } from '../Input';
import { FormData } from '../../../screens/Register';

import { Container, Error } from './styles';

interface InputFormProps extends TextInputProps {
  control: Control<FormData>;
  name: 'name' | 'amount';
  error: string | undefined;
}

export function InputForm({ control, name, error, ...rest }: InputFormProps) {
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }}) => (
          <Input
            onChangeText={onChange}
            value={value as string}
            {...rest}
          />
        )}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}
