import { Delete as DeleteIcon } from '@mui/icons-material';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import type { DataTableProps } from './data-table.types';

export function DataTable<T extends { id: unknown }>({
  data,
  columns,
  getKey,
  onDelete,
}: DataTableProps<T>) {
  const allColumns = [...columns];

  if (onDelete) {
    allColumns.push({
      header: 'Ações',
      cell: (item) => (
        <Tooltip title="Excluir">
          <IconButton onClick={() => onDelete(item)} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    });
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {allColumns.map((column) => (
              <TableCell key={column.header}>{column.header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={getKey(item)}>
              {allColumns.map((column) => (
                <TableCell key={column.header} sx={{ wordBreak: 'break-all' }}>
                  {column.cell(item)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
