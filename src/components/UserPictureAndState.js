import React, { Component } from "react";
import Button from "material-ui/Button";
import Input, { InputLabel } from "material-ui/Input";
import { FormControl } from "material-ui/Form";
const styles = {
  row: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    top: "50px",
    right: "15%"
  },
  avatar: {
    position: "relative",
    bottom: 0,
    padding: "10px",
    order: -1
  },
  bigAvatar: {
    width: 100,
    height: 100
  },
  button: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "ffffff"
  },
  input: {
    display: "none"
  },
  formControl: {
    width: 250
  },
  img: {
    height: 100,
    width: 150
  }
};

class UserPictureAndState extends Component {
  handleChange = event => {
    console.log(event.target.value);
  };

  render() {
    const who = null;
    return (
      <div className={styles.row}>
        <img
          src=" https://image.freepik.com/free-icon/small-camera_318-11159.jpg"
          className={styles.img}
          alt={"profile"}
        />
        <label htmlFor="raised-button-file">
          <Button raised component="span" className={styles.button}>
            <input type="file" />
          </Button>
        </label>
        <FormControl fullWidth className={styles.formControl}>
          <InputLabel htmlFor="status">Status Message:</InputLabel>
          <Input
            id="status"
            value=" "
            onChange={this.handleChange.bind(this)}
          />
        </FormControl>
      </div>
    );
  }
}
export default UserPictureAndState;
