import React from "react";
import { Form, FormControl } from "react-bootstrap";

const SearchBarComponent = ({ searchTerm, onSearchChange }) => (
  <Form className="d-flex flex-grow-1 me-3 flex-wrap">
    <FormControl
      type="search"
      placeholder="Cari di TakeCart"
      className="me-2 rounded-pill"
      aria-label="Search"
      value={searchTerm}
      onChange={onSearchChange}
    />
  </Form>
);

export default SearchBarComponent;
