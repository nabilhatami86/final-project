import React from "react";
import { Dropdown, Card, Button } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const UserProfileComponent = ({ userData, onLogout }) => {
  const navigate = useNavigate();

  const handleNavigateToAddress = () => {
    navigate("/address");
  };
  const handleNavigateToHistory = () => {
    navigate("/history");
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="light"
        className="fw-bold text-success border-0 bg-transparent"
      >
        <CgProfile size={30} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="shadow p-3">
        <Card className="user-profile-card">
          <Card.Body>
            <div className="mb-3">
              <strong>Full Name:</strong>
              <p>{userData.full_name}</p>
            </div>
            <div className="mb-3">
              <strong>Email:</strong>
              <p>{userData.email}</p>
            </div>
            <div className="mb-3">
              <p
                className="text-dark cursor-pointer fw-semibold"
                onClick={handleNavigateToAddress}
                style={{ cursor: "pointer" }}
              >
                Add Address
              </p>
            </div>
            <div className="mb-3">
              <p
                className="text-dark cursor-pointer fw-semibold"
                onClick={handleNavigateToHistory}
                style={{ cursor: "pointer" }}
              >
                Invoice History
              </p>
            </div>
            <Button variant="danger" className="w-100" onClick={onLogout}>
              Logout
            </Button>
          </Card.Body>
        </Card>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserProfileComponent;
