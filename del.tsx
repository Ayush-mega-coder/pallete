import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
const AddBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "38px",
  marginRight: "50px",
});
const StyledButton = styled(Button)({
  margin: "10px",
  backgroundColor: "white",
  color: "black",
  "&:hover": {
    backgroundColor: "white",
    color: "black",
  },
});
const StyledButtonCreate = styled(Button)({
  marginTop: "5px",

  color: "black",

  "&:hover": {
    // backgroundColor: "white",
    color: "black",
  },
});
const IngredientsList: React.FC = () => {
  const [ingredients, setIngredients] = useState<any[]>([]);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const navigate = useNavigate();
  const [isBulkDeleteVisible, setBulkDeleteVisible] = useState(false);
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const token = document.cookie.replace(
          /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
          "$1"
        );

        const response = await axios.get(
          "https://5c4e-150-129-102-218.ngrok-free.app/api/ingredients",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0YmZkZDg0Y2E0YzM1NTFjOTU2ZTEzZSIsIm5hbWUiOiJzaGEiLCJlbWFpbCI6InNoYW1pbGtvdHRhOTlAZ21haWwuY29tIiwiYWN0aXZlIjp0cnVlLCJwYXNzd29yZCI6IiQyYiQxMiRXTmtLdll3eGxKdkNHRC5lSi5WNFBlY0FqeWR4SVphZmV1VWtNLjlURmNud3RCcXZrckRSNiIsInJvbGUiOiJVU0VSIiwiY3JlYXRlZEF0IjoiMjAyMy0wNy0yNVQxNDozNDo0NC4yMjFaIiwidXBkYXRlZEF0IjoiMjAyMy0wNy0yNVQxNDozNDo0NC4yMjFaIiwiX192IjowfSwiaWF0IjoxNjkwMjk2MzU3fQ.xZn1KSQ6prK6v39xs5iVFgDUAKC1ipHmCmZ6b7K-b6o`,
              "ngrok-skip-browser-warning": true,
            },
          }
        );

        const data = response.data.data.ingredients;
        setIngredients(data);
        // console.log(data);
        // console.log(ingredients)
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);
  useEffect(() => {
    // Log ingredients whenever it changes
    console.log("data is", ingredients);
    // console.log(ingredients[0])
  }, [ingredients]);

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 80 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      sortable: true,
      renderHeader: (params) => {
        return (
          <div style={{ cursor: "pointer" }}>{params.colDef.headerName}</div>
        );
      },
    },
    { field: "quantity", headerName: "Quantity", width: 100, sortable: true },
    { field: "expiry", headerName: "Date", width: 140, sortable: true },
    { field: "type", headerName: "Unit", width: 100, sortable: true },
    { field: "image", headerName: "Picture", width: 150 },
    {
      field: "delete",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleDeleteClick = async () => {
    // Remove the selected rows from the state
    setIngredients((prevIngredients) =>
      prevIngredients.filter(
        (ingredient) => !selectedRows.includes(ingredient._id)
      )
    );

    // Clear the selection
    setSelectedRows([]);
    setBulkDeleteVisible(false);

    try {
      // Make the API request to delete the ingredient
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      // Delete multiple ingredients at once (if required)
      // const response = await axios.delete(
      //   `https://5c4e-150-129-102-218.ngrok-free.app/api/ingredients`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "ngrok-skip-browser-warning": true,
      //     },
      //     data: {
      //       ids: selectedRows,
      //     },
      //   }
      // );

      // Delete a single ingredient (assuming the ingredient ID is available in selectedRows[0])
      const response = await axios.delete(
        `https://5c4e-150-129-102-218.ngrok-free.app/api/ingredients/${selectedRows[0]}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0YmZkZDg0Y2E0YzM1NTFjOTU2ZTEzZSIsIm5hbWUiOiJzaGEiLCJlbWFpbCI6InNoYW1pbGtvdHRhOTlAZ21haWwuY29tIiwiYWN0aXZlIjp0cnVlLCJwYXNzd29yZCI6IiQyYiQxMiRXTmtLdll3eGxKdkNHRC5lSi5WNFBlY0FqeWR4SVphZmV1VWtNLjlURmNud3RCcXZrckRSNiIsInJvbGUiOiJVU0VSIiwiY3JlYXRlZEF0IjoiMjAyMy0wNy0yNVQxNDozNDo0NC4yMjFaIiwidXBkYXRlZEF0IjoiMjAyMy0wNy0yNVQxNDozNDo0NC4yMjFaIiwiX192IjowfSwiaWF0IjoxNjkwMjk2MzU3fQ.xZn1KSQ6prK6v39xs5iVFgDUAKC1ipHmCmZ6b7K-b6o`,
            "ngrok-skip-browser-warning": true,
          },
        }
      );

      // Check the response and handle deletion success/failure
      if (response.status === 200) {
        console.log("Ingredient deleted successfully");
      } else {
        console.log("Failed to delete the ingredient");
      }
    } catch (error) {
      console.error("Error while deleting ingredient:", error);
    }
  };

  const handleCreateClick = () => {
    navigate("/ingredients/create");
  };
  const handleRowSelectionModelChange = (selection: any) => {
    setBulkDeleteVisible(true);
  };
  const handleRowClick = (params: any) => {
    const ingredientId = params.id;

    navigate(`/ingredients/${ingredientId}/show`);
  };

  return (
    <>
      <AddBox>
        {isBulkDeleteVisible && (
          <IconButton onClick={handleDeleteClick}>
            <Delete />
          </IconButton>
        )}
        <StyledButtonCreate startIcon={<AddIcon />} onClick={handleCreateClick}>
          Create
        </StyledButtonCreate>
      </AddBox>

      <div
        style={{
          marginLeft: "230px",
          marginTop: "0px",
          height: "80%",
          width: "80%",
          boxShadow: "0px 2px 4px rgba(4, 4, 1, 0.4)",

          // padding: "5px",
          borderRadius: "8px",
        }}
      >
        <DataGrid
          columns={columns}
          rows={ingredients}
          checkboxSelection
          pagination
          onRowClick={handleRowClick}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          getRowId={(row) => row._id}
        />
      </div>
    </>
  );
};

export default IngredientsList;
