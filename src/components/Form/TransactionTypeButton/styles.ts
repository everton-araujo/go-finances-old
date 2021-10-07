import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";

interface IconProps {
  type: 'up' | 'down';
}

interface ContainerProps {
  type: 'up' | 'down';
  isActive: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 48%;
  border: 1.5px solid ${({ theme}) => theme.colors.text};
  border-radius: 5px;

  ${({ isActive, type }) => isActive && type === 'up' && css`
    background-color: ${({ theme }) => theme.colors.success_light};
    border: 0px;
  `}

  ${({ isActive, type }) => isActive && type === 'down' && css`
    background-color: ${({ theme }) => theme.colors.attention_light};
    border: 0px;
  `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type}) => 
    type === 'up' ? theme.colors.success : theme.colors.attention
  };
`;  

export const Title = styled.Text`
  font-family: ${({ theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
