import React, { useState, useRef } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, FormGroup, FormControl, InputLabel, MenuItem, Select, TextField, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const FiltersAccordion = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filters] = useState([
    { name: 'cantidad', label: 'Cantidad' },
    { name: 'volumen', label: 'Volumen' },
    { name: 'nombre', label: 'Nombre' },
    { name: 'marca', label: 'Marca' },
    { name: 'tipoBebida', label: 'Tipo de Bebida' },
  ]);

  const accordionRef = useRef(null);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    setFilterValue('');
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica para aplicar los filtros
    console.log('Filtro seleccionado:', selectedFilter);
    console.log('Valor del filtro:', filterValue);
    setExpanded(false); // Cierra el filtro al aplicar los filtros
  };

  return (
    <>
      <Accordion ref={accordionRef} expanded={expanded} onChange={handleExpand} className="filters-accordion">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>Filtro</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit} className="filters-form font-Poppins">
            <FormControl variant="outlined" className="filter-select w-full">
              <InputLabel id="filter-label">Seleccionar filtro</InputLabel>
              <Select
                labelId="filter-label"
                id="filter-select"
                value={selectedFilter}
                onChange={handleFilterChange}
                label="Seleccionar filtro"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {filters.map((filter) => (
                  <MenuItem key={filter.name} value={filter.name}>{filter.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedFilter && (
              <TextField
                label={`Escribir valor para ${selectedFilter}`}
                variant="outlined"
                value={filterValue}
                onChange={(event) => setFilterValue(event.target.value)}
                className="text-field m-4"
              />
            )}
            <Button type="submit" variant="contained" color="primary" className="filter-button m-4">
              Aplicar Filtros
            </Button>
          </form>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default FiltersAccordion;









