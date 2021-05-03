import React from 'react';
import { useHistory } from "react-router";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import callapi_editprofile_deactivate from "../callapi_editprofile.js/callapi_editprofile_deactivate" ;

export default function DeleteAccountModal(props) {  

    const history = useHistory();
    const Deactivate = () => {
        callapi_editprofile_deactivate(() => {
            history.push("/login")        
        }) ;
    }

  return (
    <div>      
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete your accout ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">            
            all of your datas and histories will be deleted .            

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={Deactivate} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
