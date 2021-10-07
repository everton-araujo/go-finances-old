import React from 'react';

import { HighligthCard } from '../../components/HighligthCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { 
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Avatar,
  User,
  UserGreeting,
  UserName,
  LogoutButton,
  LogoutIcon,
  Cards,
  Transactions,
  Title,
  TransactionsList
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      operationDate: '10/09/2021',
      type: 'income'
    },
    {
      id: '2',
      title: 'Almoço',
      amount: 'R$ 120,00',
      category: {
        name: 'Comida',
        icon: 'coffee'
      },
      operationDate: '10/09/2021',
      type: 'outcome'
    },
    {
      id: '3',
      title: 'Aluguel',
      amount: 'R$ 3.000,00',
      category: {
        name: 'Casa',
        icon: 'home'
      },
      operationDate: '05/09/2021',
      type: 'outcome'
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Avatar source={{ uri: 'data:image/jpeg;base64,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'}} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Zezinho</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <LogoutIcon name='power' />
          </LogoutButton>
        </UserWrapper>
      </Header>
    
      <Cards>
        <HighligthCard 
          type='up'
          title='Entradas'
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de Setembro'
        />
        <HighligthCard 
          type='down'
          title='Saídas'
          amount='R$ 1.259,00'
          lastTransaction='Última entrada dia 25 de Setembro'
        />
        <HighligthCard
          type='total' 
          title='Entradas'
          amount='R$ 16.141,00'
          lastTransaction='01 à 29 de Setembro'
        />
      </Cards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />

      </Transactions>
    </Container>
  );
}
