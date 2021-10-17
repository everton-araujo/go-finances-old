import React from 'react';

import { categories } from '../../utils/categories';

import { 
  Container,
  Title,
  Amount,
  Footer,
  Category,
  CategoryIcon,
  CategoryName,
  OperationDate
} from './styles';

export interface TransactionCardProps {
  name: string;
  amount: string;
  category: string;
  date: string;
  type: 'income' | 'outcome';
}

interface TransactionProps {
  data: TransactionCardProps;
}

export function TransactionCard({ data }: TransactionProps) {
  const category = categories.filter(
    item => item.key === data.category
  )[0];

  return (
    <Container>
      <Title>{data.name}</Title>

      <Amount type={data.type}>
        { data.type === 'outcome' && '- ' }
        { data.amount }
      </Amount>

      <Footer>
        <Category>
          <CategoryIcon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <OperationDate>{data.date}</OperationDate>
      </Footer>
    </Container>
  );
}
