import type { Key, ReactNode } from 'react';

export interface ColumnDef<T> {
  header: string;
  cell: (item: T) => ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  getKey: (item: T) => Key;
  onDelete?: (item: T) => void;
}
