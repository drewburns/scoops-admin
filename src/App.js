import React from "react";
import {
  FormControl,
  Input,
  InputLabel,
  Card,
  Grid,
  RadioGroup,
  FormControlLabel,
  Button,
  TextField,
  Radio,
} from "@mui/material";
import DateTimePicker from "react-datetime-picker";
import { useSnackbar } from "react-simple-snackbar";

import axios from "axios";

import "./App.css";
const options = {
  position: "top-right",
  style: {
    backgroundColor: "white",
    border: "2px solid black",
    color: "black",
    fontFamily: "Menlo, monospace",
    fontSize: "20px",
    textAlign: "center",
  },
  closeStyle: {
    color: "black",
    fontSize: "16px",
  },
};
function App() {
  const [type, setType] = React.useState("all");
  const [openSnackbar, closeSnackbar] = useSnackbar(options);
  const [title, setTitle] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [date, onChangeDate] = React.useState(new Date());

  const [message, setMessage] = React.useState("");
  const sendMessage = () => {
    setLoading(true);
    axios
      .post("https://themarketscoop.herokuapp.com/send_message", {
        type,
        body: message,
        title,
        date,
      })
      .then((res) => {
        openSnackbar("Sent!");
        setLoading(false);
      })
      .catch((err) => {
        openSnackbar("Failed!");
        setLoading(false);
      });
  };
  return (
    <div className="App">
      <h1 style={{ textAlign: "center", color: "white" }}>
        Market Scoops Admin Dash
      </h1>
      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Card style={{ backgroundColor: "#d3d3d3" }}>
            {/* <InputLabel htmlFor="my-input">Email address</InputLabel> */}
            {/* <Input id="my-input" aria-describedby="my-helper-text" /> */}
            <h3>Type:</h3>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="all"
              id="type-radio"
              name="radio-buttons-group"
              onChange={(e) => setType(e.target.value)}
            >
              <div>
                <FormControlLabel
                  value="free"
                  control={<Radio />}
                  label="Free"
                />
                <FormControlLabel
                  value="paid"
                  control={<Radio />}
                  label="Paid"
                />
                <FormControlLabel value="all" control={<Radio />} label="All" />
              </div>
            </RadioGroup>
            <h3>Title:</h3>
            <TextField
              placeholder="Title"
              multiline
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: 400 }}
              rows={1}
            />

            <h3>Message:</h3>
            <TextField
              placeholder="Message for users..."
              multiline
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: 400 }}
              rows={10}
            />
            <h3>Sent at: </h3>
            <DateTimePicker onChange={onChangeDate} value={date} />

            <br />
            <br />
            <br />
            {loading ? (
              <h2>Loading ...</h2>
            ) : (
              <Button
                style={{ height: 60, marginBottom: 50 }}
                variant="contained"
                onClick={() => sendMessage()}
              >
                Send Message
              </Button>
            )}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
