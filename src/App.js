import React, {useEffect, useRef, useState} from "react";
import './App.css';
import axios from 'axios';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {ChatInput} from "./ChatInput";
import {ChatText} from "./ChatText";

const useStyles = makeStyles(() => ({
  form: {
    position: 'absolute',
    bottom: '20px',
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
  messagesContainer: {
    width: '100%',
    maxHeight: 'calc(100vh - 200px)',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  messagesWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  messageBox: {
    textAlign: 'left',
    borderRadius: '20px',
    marginBottom: '10px',
    padding: '5px 20px',
  },
  message: {
    maxWidth: '80%',
    alignSelf: 'flex-end',
    background: '#3f51b5',
    color: 'white',
    borderBottomRightRadius: '2px',
  },
  reply: {
    alignSelf: 'flex-start',
    background: '#eee',
    color: 'black',
    borderBottomLeftRadius: '2px',
  },
}));

function App() {
  const classes = useStyles();

  const initialMessages = [
    {
      'type': 'reply',
      'content': 'Hi, I am Dental Chatbot. How can I help you?',
    },
  ];
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState('');

  const CHATBOT_URL = 'http://127.0.0.1:5000/v1/chat?message=';

  const getReply = async () => {
    try {
      console.log(messages);
      const res = await axios.get(`${CHATBOT_URL}${message}`);
      const reply = res.data['reply'];
      setMessages([...messages, {
        'type': 'message',
        'content': message,
      }, {
        'type': 'reply',
        'content': reply,
      }])
    } catch (e) {
      console.error(e);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (message === '') {
      return;
    }
    let reply = getReply();
    setMessage('');
    console.log(`got1 `, reply);
  }

  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        })
    }
  }, [messages]);

  const {form, inputWrapper, buttonWrapper, input, button} = classes;
  return (
    <div className="App">
      <header className="App-header">
        <div className="title">
          <div>Dental Chatbot</div>
        </div>
        <ChatText classes={classes} messages={messages} callbackfn={(item, index) => (
          <div key={index} ref={messageRef}
               className={`${classes.messageBox} ${item.type === 'message' ? classes.message : classes.reply}`}>
            {item.content}
          </div>
        )}/>
        <ChatInput onSubmit={handleSubmit} className={form} className1={inputWrapper} value={message}
                   onInput={(e) => setMessage(e.target.value)} className2={input} className3={buttonWrapper}
                   className4={button}/>
      </header>
    </div>
  );
}

export default App;
