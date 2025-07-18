import type { Key, ReactNode } from 'react';

export interface DataCardsProps<T> {
  data: T[];
  renderCard: (item: T) => ReactNode;
  getKey: (item: T) => Key;
  onDelete?: (item: T) => void;
}
