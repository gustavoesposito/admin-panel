import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const initialFilter = {
  column: '',
  operator: '',
  value: '',
};

const FilterPanel = () => {
  const [filters, setFilters] = useState([initialFilter]);

  const handleAddFilter = () => {
    setFilters([...filters, { ...initialFilter }]);
  };

  const handleRemoveFilter = (index) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
  };

  const handleFilterChange = (index, field, value) => {
    const newFilters = filters.map((filter, i) => {
      if (i === index) {
        return { ...filter, [field]: value };
      }
      return filter;
    });
    setFilters(newFilters);
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#fff', maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>Filtros</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filters.map((filter, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel id={`filter-column-label-${index}`}>Coluna</InputLabel>
              <Select
                labelId={`filter-column-label-${index}`}
                id={`filter-column-${index}`}
                value={filter.column}
                label="Coluna"
                onChange={(e) => handleFilterChange(index, 'column', e.target.value)}
                sx={{ width: '200px' }}
              >
                <MenuItem value="dataCadastro">Data de cadastro</MenuItem>

              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id={`filter-operator-label-${index}`}>Operador</InputLabel>
              <Select
                labelId={`filter-operator-label-${index}`}
                id={`filter-operator-${index}`}
                value={filter.operator}
                label="Operador"
                onChange={(e) => handleFilterChange(index, 'operator', e.target.value)}
                sx={{ width: '150px' }}
              >
                <MenuItem value="equals">é</MenuItem>
                <MenuItem value="notEquals">não é</MenuItem>

              </Select>
            </FormControl>

            <TextField
              id={`filter-value-${index}`}
              label="Valor"
              value={filter.value}
              fullWidth
              onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
              sx={{ width: '200px' }}
            />

            <IconButton color="error" onClick={() => handleRemoveFilter(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
        <Button
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAddFilter}
          sx={{ flexGrow: 1 }}
        >
          Adicionar filtro
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            // Aqui você adicionará a lógica para aplicar os filtros
          }}
          sx={{ flexGrow: 1 }}
        >
          Aplicar filtros
        </Button>
      </Box>
    </Paper>
  );
};

export default FilterPanel;
