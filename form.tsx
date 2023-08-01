import React, { useCallback, useState } from "react";
import { styled } from "@mui/material/styles";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
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
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import AddIcon from "@mui/icons-material/Add";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { userOptions } from "./data";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    // margin: "20px",
    marginTop: "60px",
    marginLeft: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor:'red',
    justifyContent: "center",
    gap: "20px",
    "& .MuiTextField-root, & .MuiFormControl-root": {
      width: "50%",
    },
  },

  formControl: {
    width: "50%",
  },
  box: {
    margin: "10px",
    display: "flex",
  },
  button: {
    margin: "5px",
    border: "2px solid blue",
    color: "black",
    // "&:hover": {
    //   backgroundColor: "white",
    //   color: "black",
    // },
  },
  button1: {
    // Move the button to the right-bottom

    color: "black",
    backgroundColor: "white",
    // "&:hover": {
    //   backgroundColor: "white",
    //   color: "black",
    // },
  },
  button2: {
    backgroundColor: "#002D62",
    color: "white",
    "&:hover": {
      backgroundColor: "#002D62",
      color: "white",
    },
  },
  boxItem: {
    // marginTop: "-40px",
    display: "flex",
    justifyContent: "space-between",

    // width: "550px",
    width: "50%",
  },

  users: {
    zIndex: 100,
  },
  alert: {
    marginLeft: "600px",
    backgroundColor: "#002D62",
  },
  inputLabel: {},
}));
const StyledAsyncSelect = styled(AsyncSelect)({
  width: "50%",
});
interface FormValues {
  userId: string;
  name: string;
  quantity: number;
  expiry: string;
  type: string;
  image: string;
  // base64Image: string | null;
}

const IngredientsCreateForm: React.FC = () => {
  const classes = useStyles();
  const [isDragging, setIsDragging] = useState(false);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      // if (data.image) {
      //   // Convert the image file to Base64-encoded string
      //   const imageBase64 = await getBase64String(data.image);
      //   // Update the data object to include the image as a string
      //   data.image = null;
      // }
      data.quantity = parseFloat(data.quantity.toString());
      data.image = "https://exmple.com/image";
      console.log("Form values:", data);

      // Send a POST request to your API endpoint
      const config = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0YmZkZDg0Y2E0YzM1NTFjOTU2ZTEzZSIsIm5hbWUiOiJzaGEiLCJlbWFpbCI6InNoYW1pbGtvdHRhOTlAZ21haWwuY29tIiwiYWN0aXZlIjp0cnVlLCJwYXNzd29yZCI6IiQyYiQxMiRXTmtLdll3eGxKdkNHRC5lSi5WNFBlY0FqeWR4SVphZmV1VWtNLjlURmNud3RCcXZrckRSNiIsInJvbGUiOiJVU0VSIiwiY3JlYXRlZEF0IjoiMjAyMy0wNy0yNVQxNDozNDo0NC4yMjFaIiwidXBkYXRlZEF0IjoiMjAyMy0wNy0yNVQxNDozNDo0NC4yMjFaIiwiX192IjowfSwiaWF0IjoxNjkwMjk2MzU3fQ.xZn1KSQ6prK6v39xs5iVFgDUAKC1ipHmCmZ6b7K-b6o", // Your access token here
        },
      };

      // Send a POST request to your API endpoint with data and configuration
      await axios.post(
        "http://localhost:5000/api/ingredients",
        data,
        config // Pass the configuration as the third argument
      );

      // Show a success snackbar
      setIsSnackbarOpen(true);
      navigate('/ingredients')

      // Reset the form after successful submission
      reset({
        ...data,
        name: "",
        quantity: 0,
        expiry: new Date().toISOString().slice(0, 10),
        type: "",
        // image: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error and show an error snackbar
      // You can add a state to show an error snackbar
      // setIsErrorSnackbarOpen(true);
    }
  };
  const getBase64String = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to read file."));
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleDragEnter = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleAddMoreButtonClick = () => {
    console.log("val");
  };

  const filterColors = (inputValue: string) => {
    return userOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: any) => void
  ) => {
    setTimeout(() => {
      callback(filterColors(inputValue));
    }, 1000);
  };
  // const handleDrop = useCallback(
  //   (acceptedFiles: File[]) => {
  //     if (acceptedFiles && acceptedFiles.length > 0) {
  //       const selectedFile = acceptedFiles[0];
  //       console.log("Selected picture:", selectedFile);
  //       setValue("image", selectedFile);

  //       // Show the Snackbar with the "Picture uploaded" message
  //       setIsSnackbarOpen(true);
  //     }
  //   },
  //   [setValue]
  // );
  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  // Hook from react-dropzone to handle file drop and selection
  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop: handleDrop,
  //   onDragEnter: handleDragEnter, // Add the drag enter event handler
  //   onDragLeave: () => setIsDragging(false),
  // });

  return (
    <div>
      <div className={classes.container}>
        <StyledAsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={loadOptions}
          placeholder="UserID"
          className={classes.users}
        />

        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <TextField
              label="Name"
              {...field}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name="quantity"
          control={control}
          defaultValue={0}
          rules={{
            required: "Quantity is required",
            min: { value: 0, message: "Quantity must be greater than or equal to 0" },
          }}
          render={({ field }) => (
            <TextField
              label="Quantity"
              type="number"
              {...field}
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
            />
          )}
        />

        <Controller
          name="type"
          control={control}
          defaultValue=""
          rules={{ required: "Unit is required" }}
          render={({ field }) => (
            <FormControl error={!!errors.type} className={classes.formControl}>
              <InputLabel className={classes.inputLabel}>Unit</InputLabel>
              <Select {...field}>
                <MenuItem value="kg">KG</MenuItem>
                <MenuItem value="gm">GM</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="ml">ML</MenuItem>
                <MenuItem value="count">COUNT</MenuItem>
              </Select>
              <FormHelperText>{errors.type?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name="expiry"
          control={control}
          defaultValue={new Date().toISOString().slice(0, 10)}
          rules={{ required: "Date is required" }}
          render={({ field }) => (
            <TextField
              label="Date"
              type="date"
              {...field}
              error={!!errors.expiry}
              helperText={errors.expiry?.message}
            />
          )}
        />
        {/* 
<Controller
          name="image"
          control={control}
          defaultValue={null}
          rules={{ required: "Picture is required" }}
          render={() => (
            <section>
              {/* Apply the border style when a file is being dragged */}
        {/* <div
                {...getRootProps()}
                style={{
                  border: isDragging
                    ? "2px dashed blue"
                    : "2px solid transparent",
                  padding: "10px",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input {...getInputProps()} />
                <Button
                  startIcon={<AddAPhotoIcon />}
                  className={classes.button}
                >
                  Upload or Drag Pictures
                </Button>
              </div>
            </section>
          )}
        />  */}

        {/* {isPictureUploaded && <p>Picture uploaded</p>} */}
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <MuiAlert
            className={classes.alert}
            onClose={handleCloseSnackbar}
            severity="success"
            elevation={6}
            variant="filled"
          >
            Ingrident added
          </MuiAlert>
        </Snackbar>

        <Box className={classes.boxItem}>
          <Button
            className={classes.button2}
            onClick={handleSubmit(onSubmit)}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>

          <Button
            className={classes.button1}
            onClick={handleSubmit(onSubmit)}
            startIcon={<AddIcon />}
          >
            Add Item
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default IngredientsCreateForm;
