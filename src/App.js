import React, {useState} from "react";
import './App.css';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
  form: {
    width: '80%',
  },
  inputWrapper: {
    width: '90%',
    margin: 0,
  },
  buttonWrapper: {
    width: '10%',
  },
  input: {
    margin: 0,
    height: '55.98px',
  },
  button: {
    height: '55.98px',
  },
}));

function App() {
  const classes = useStyles();

  const [messages, setMessages] = React.useState(['one', 'two', 'three']);
  const [message, setMessage] = useState('');

  const CHATBOT_URL = 'http://127.0.0.1:5000/v1/chat?message=';

  const getReply = async () => {
    try {
      const res = await axios.get(`${CHATBOT_URL}${message}`);
      const reply = res.data['reply'];
      console.log(`got2 ${reply}`,);
      setMessages([...messages, reply])
    } catch (e) {
      console.error(e);
    }
  };

  function handleSubmit(event) {
    setMessage('');
    event.preventDefault();
    let reply = getReply();
    console.log(`got1 `, reply);
  }

  const {form, inputWrapper, buttonWrapper, input, button} = classes;
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dental Clinic Chatbot</h1>
        {messages.map((item, index) => (
          <div key={index}>
            {item}
          </div>
        ))}
        <form onSubmit={handleSubmit} className={form} noValidate>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item className={inputWrapper}>
              <TextField
                value={message}
                onInput={(e) => setMessage(e.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="message"
                label="Enter message here"
                name="message"
                autoComplete="message"
                autoFocus
                className={input}
              />
            </Grid>
            <Grid item className={buttonWrapper}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={button}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      </header>
    </div>
  );
}

export default App;
