import { ReactNode } from 'react';

export enum ThemeModeType {
  DARK = 'dark',
  LIGHT = 'light',
}

export type MenuItem = {
  text: string;
  textColor?: string;
  value?: string | number | null;
  color?: string;
  icon?: ReactNode;
  action?: () => void;
  textColor?: string;
};

export type IFCProps = {
  children: JSX.Element;
};

export interface IOutletContext {
  sidebar: {
    handleSidebarToggle: () => void;
  };
}

export type ICategorySelectProps = {
  categoryId: number | null;
  onChange: (categoryId: number) => void;
  onSelecting?: () => void;
  onReady?: () => void;
};
