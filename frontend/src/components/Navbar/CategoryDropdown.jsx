import React from "react";
import { Dropdown } from "react-bootstrap";
import { BiSolidCategory } from "react-icons/bi";
import { Link } from "react-router-dom";

const CategoryDropdown = ({ categories }) => (
  <Dropdown className="me-3">
    <Dropdown.Toggle
      variant="light"
      id="dropdown-basic"
      className="fw-semibold text-dark fs-6"
    >
      Kategori <BiSolidCategory />
    </Dropdown.Toggle>
    <Dropdown.Menu className="bg-transparent custom-dropdown-menu">
      {categories.length > 0 ? (
        categories.map((category) => (
          <Dropdown.Item
            key={category.name}
            as={Link}
            to={`/category/${category.name}`}
            className="custom-dropdown-item text-dark"
          >
            {category.name}
          </Dropdown.Item>
        ))
      ) : (
        <Dropdown.Item className="text-dark">
          No Categories Available
        </Dropdown.Item>
      )}
    </Dropdown.Menu>
  </Dropdown>
);

export default CategoryDropdown;
