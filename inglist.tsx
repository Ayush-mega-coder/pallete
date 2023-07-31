import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

import AddIcon from "@mui/icons-material/Add";

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
    // Fetch the list of ingredients here and update the state
    // For example:
    // const fetchIngredients = async () => {
    //   const response = await fetch("https://api.example.com/ingredients");
    //   const data = await response.json();
    //   setIngredients(data);
    // };
    // fetchIngredients();

    // Dummy data for testing
    const dummyIngredients = [
      {
        id: 1,
        name: "Garlic",
        quantity: 100,
        date: "2023-07-24",
        unit: "kg",
        picture: "url_to_picture_1",
      },
      {
        id: 2,
        name: "Onion",
        quantity: 200,
        date: "2023-07-25",
        unit: "kg",
        picture: "url_to_picture_2",
      },
      {
        id: 3,
        name: "Tomato",
        quantity: 20,
        date: "2023-07-25",
        unit: "gm",
        picture: "url_to_picture_2",
      },
    ];
    setIngredients(dummyIngredients);
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
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
    { field: "date", headerName: "Date", width: 140, sortable: true },
    { field: "unit", headerName: "Unit", width: 100, sortable: true },
    { field: "picture", headerName: "Picture", width: 150 },
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

  const handleDeleteClick = () => {
    // Remove the selected rows from the state
    setIngredients((prevIngredients) =>
      prevIngredients.filter(
        (ingredient) => !selectedRows.includes(ingredient.id)
      )
    );

    // Clear the selection
    setSelectedRows([]);
    setBulkDeleteVisible(false);
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
          height: 300,
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
        />
      </div>
    </>
  );
};

export default IngredientsList;
