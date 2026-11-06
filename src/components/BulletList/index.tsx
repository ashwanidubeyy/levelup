import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import type { BulletListProps } from '../../types';
import { BulletListStyles } from './styles';
import { Icons } from '../../assets/icons';

const { ShieldIcon, EyeOffIcon } = Icons;

const ICON_SIZE = moderateScale(20, 0.9);

const BulletList = ({ items, tone }: BulletListProps) => (
  <BulletListStyles.Container>
    {items?.map((item: string) => (
      <BulletListStyles.Item key={item}>
        {tone === 'allowed' ? <ShieldIcon size={ICON_SIZE} /> : <EyeOffIcon size={ICON_SIZE} />}
        <BulletListStyles.Text>{item}</BulletListStyles.Text>
      </BulletListStyles.Item>
    ))}
  </BulletListStyles.Container>
);

export default BulletList;
