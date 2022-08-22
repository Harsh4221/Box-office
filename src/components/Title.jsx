/* eslint-disable react/function-component-definition */
import React, { memo } from 'react';
import { TitleWrapper } from './Titles.styled';

const Title = ({ title, subtitle }) => {
  return (
    <TitleWrapper>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </TitleWrapper>
  );
};

export default memo(Title);
