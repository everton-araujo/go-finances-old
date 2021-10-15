import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/core';
import { 
  Keyboard, 
  Modal, 
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { InputForm } from '../../components/Form/InputForm';

import { CategorySelect } from '../CategorySelect';

import {
  Container,
  Header,
  Form,
  Fields,
  Title,
  TransactionsType,
} from './styles';

export interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório'),
});

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModal, setCategoryModal] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const dataKey = '@goFinances:transactions';

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  function handleTransactionsTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModal(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModal(true);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação');
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const formattedData = [
        ...currentData,
        newTransaction
      ];

      await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria'
      });

      navigation.navigate('Listagem');

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name='name'
              control={control}
              placeholder='Nome'
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm
              name='amount'
              control={control}
              placeholder='Preço'
              keyboardType='numeric'
              error={errors.amount && errors.amount.message}
            />

            <TransactionsType>
              <TransactionTypeButton 
                title='Income'
                type='up'
                onPress={() => handleTransactionsTypeSelect('up')}
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton 
                title='Outcome'
                type='down'
                onPress={() => handleTransactionsTypeSelect('down')}
                isActive={transactionType === 'down'}
              />
            </TransactionsType>

            <CategorySelectButton 
              title={category.name} 
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button 
            title='Enviar'
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal visible={categoryModal}>
          <CategorySelect 
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
