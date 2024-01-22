import React, { useEffect, useState } from "react";

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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

interface Filter {
  column: string;
  operator: string;
  value: string;
}

interface Filter {
  column: string;
  operator: string;
  value: string;
}

interface FilterPanelProps {
  onFiltersApply: (filters: Filter[]) => void;
  isOpen: boolean;
  togglePanel: () => void;
}

const initialFilter: Filter = {
  column: "",
  operator: "",
  value: "",
};

const FilterPanel: React.FC<FilterPanelProps> = ({ onFiltersApply, isOpen, togglePanel }) => {
  const [filters, setFilters] = useState<Filter[]>([initialFilter]);

  const handleAddFilter = () => {
    setFilters([...filters, { ...initialFilter }]);
  };

  const handleRemoveFilter = (index: number) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
  };

  const handleFilterChange = (
    index: number,
    field: keyof Filter,
    value: string
  ) => {
    const newFilters = filters.map((filter, i) => {
      if (i === index) {
        return { ...filter, [field]: value };
      }
      return filter;
    });
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersApply(filters);
    togglePanel();
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        backgroundColor: "#fff",
        width: '100%',
        maxWidth: { xs: '100%', sm: '600px' },
        boxSizing: 'border-box',
        margin: "auto",
        display: isOpen ? "block" : "none",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {filters.map((filter, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <FormControl fullWidth>
              <InputLabel id={`filter-column-label-${index}`}>
                Coluna
              </InputLabel>

              <Select
                labelId={`filter-column-label-${index}`}
                id={`filter-column-${index}`}
                value={filter.column}
                label="Coluna"
                onChange={(e) =>
                  handleFilterChange(index, "column", e.target.value)
                }
                sx={{
                  width: { xs: '100%', sm: '200px' }
                }}
              >
                <MenuItem value="id">ID</MenuItem>
                <MenuItem value="name">Nome</MenuItem>
                <MenuItem value="phone">Telefone</MenuItem>
                <MenuItem value="registrationDate">Data de cadastro</MenuItem>
              </Select>
            </FormControl>

            {filter.column === 'registrationDate' ? (
              <TextField
                type="text"
                placeholder="dd/mm/aaaa"
                fullWidth

              />
            ) : (
              <TextField
                id={`filter-value-${index}`}
                label="Valor"
                value={filter.value}
                fullWidth
                onChange={(e) =>
                  handleFilterChange(index, "value", e.target.value)
                }
              />
            )}
            <IconButton color="error" onClick={() => handleRemoveFilter(index)}>
              <CloseIcon />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          startIcon={<AddIcon sx={{ color: "#9C26B0" }} />}
          onClick={handleAddFilter}
          sx={{
            color: "#9C26B0",
            textTransform: 'none',
            "&:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          Adicionar filtro
        </Button>
        <Button
          onClick={handleApplyFilters}
          sx={{
            color: "#9C26B0",
            background: "transparent",
            textTransform: 'none',
            "&:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          Aplicar filtros
        </Button>
      </Box>
    </Paper>
  );
};

export default FilterPanel;
