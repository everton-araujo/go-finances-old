import React from 'react';

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

interface Category {
  name: string;
  icon: string;
}

export interface TransactionCardProps {
  title: string;
  amount: string;
  category: Category;
  operationDate: string;
  type: 'income' | 'outcome';
}

interface TransactionProps {
  data: TransactionCardProps;
}

export function TransactionCard({ data }: TransactionProps) {
  return (
    <Container>
      <Title>{data.title}</Title>

      <Amount type={data.type}>
        { data.type === 'outcome' && '- ' }
        { data.amount }
      </Amount>

      <Footer>
        <Category>
          <CategoryIcon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>

        <OperationDate>{data.operationDate}</OperationDate>
      </Footer>
    </Container>
  );
}
