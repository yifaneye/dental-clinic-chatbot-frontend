import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as PropTypes from "prop-types";
import React from "react";

export function ChatInput(props) {
  return <form onSubmit={props.onSubmit} className={props.className} noValidate>
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item className={props.className1}>
        <TextField
          value={props.value}
          onInput={props.onInput}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="message"
          label="Enter message here"
          name="message"
          autoComplete="message"
          autoFocus
          className={props.className2}
        />
      </Grid>
      <Grid item className={props.className3}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={props.className4}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  </form>;
}

ChatInput.propTypes = {
  onSubmit: PropTypes.func,
  className: PropTypes.string,
  className1: PropTypes.string,
  value: PropTypes.string,
  onInput: PropTypes.func,
  className2: PropTypes.string,
  className3: PropTypes.string,
  className4: PropTypes.string
};
