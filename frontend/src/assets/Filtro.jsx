import React, { useState, useEffect, useRef } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, FormGroup, FormControlLabel, Checkbox, TextField, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const FiltersAccordion = () => {
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState({
    cantidad: false,
    volumen: false,
    nombre: false,
    marca: false,
    tipoBebida: false,
  });

  const accordionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accordionRef.current && !accordionRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleChange = (filter) => (event) => {
    setFilters({ ...filters, [filter]: event.target.checked });
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica para aplicar los filtros
    console.log('Filtros aplicados:', filters);
  };

  return (
    <Accordion ref={accordionRef} expanded={expanded} onChange={handleExpand} className="filters-accordion">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography>Filtros de Búsqueda</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit} className="filters-form">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={filters.cantidad} onChange={handleChange('cantidad')} className="filter-checkbox" />}
              label="Cantidad"
            />
            <FormControlLabel
              control={<Checkbox checked={filters.volumen} onChange={handleChange('volumen')} className="filter-checkbox" />}
              label="Volumen"
            />
            <FormControlLabel
              control={<Checkbox checked={filters.nombre} onChange={handleChange('nombre')} className="filter-checkbox" />}
              label="Nombre"
            />
            <FormControlLabel
              control={<Checkbox checked={filters.marca} onChange={handleChange('marca')} className="filter-checkbox" />}
              label="Marca"
            />
            <FormControlLabel
              control={<Checkbox checked={filters.tipoBebida} onChange={handleChange('tipoBebida')} className="filter-checkbox" />}
              label="Tipo de Bebida"
            />
          </FormGroup>
          <TextField
            id="outlined-basic"
            label="Filtrar por..."
            variant="outlined"
            className="filter-textfield"
          />
          <Button type="submit" variant="contained" color="primary" className="filter-button">
            Aplicar Filtros
          </Button>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default FiltersAccordion;

