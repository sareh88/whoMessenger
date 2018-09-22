import React from "react";
import Button from "material-ui/Button";
import Dialog, { DialogActions, DialogContent } from "material-ui/Dialog";

const styles = {
  closeDialog: {
    color: "#00010b",
    position: "absolute",
    right: 0,
    top: 0
  },
  comp: {
    position: "relative",
    display: "flex",
    width: "50%"
  },
  background: {
    backgroundColor: "rgba(0, 0, 0,0.5)"
  }
};

class FormDialog extends React.Component {
  render() {
    const who = null;

    return (
      <div className={styles.comp}>
        <Dialog
          fullScreen={this.props.fullScreen}
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
          className={styles.background}
        >
          <DialogContent>{this.props.compo}</DialogContent>
          <DialogActions>
            <Button
              className={styles.closeDialog}
              onClick={this.props.handleClose}
            >
              <i className="material-icons" id="close-cypress">
                close
              </i>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default FormDialog;
