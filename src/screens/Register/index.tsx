import React, { useState } from 'react';
import { Modal } from 'react-native';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import { CategorySelect } from '../CategorySelect';

import {
  Container,
  Header,
  Form,
  Fields,
  Title,
  TransactionsType,
} from './styles';

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModal, setCategoryModal] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
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

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input 
            placeholder='Nome'
          />
          
          <Input 
            placeholder='Preço'
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

        <Button title='Enviar' />
      </Form>

      <Modal visible={categoryModal}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}
