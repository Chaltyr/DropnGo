import React,{useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { useHistory } from 'react-router-dom'

import '../App.css';

import BasicDateTimePicker from '../components/schedule2';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function BookingModal({ setMessage, setOpenAlert, setColor, price_per_hour }) {
  let history = useHistory()
 
  const [openModal, setOpenModal] = React.useState(false);

  const [dropOffDate, setDropOffDate] = useState(new Date());
  const [pickUpDate, setPickUpDate] = useState(new Date());
  const [luggageNum, setLuggageNum] = useState(1)

  const getCost = () => {
    const start = moment(dropOffDate)
    const end = moment(pickUpDate)
    const duration = moment.duration(end.diff(start))
    const hours = duration.asHours()

    let round = Math.floor(hours)
    let cost;
    if (hours > round) {
        cost = (round + 1) * price_per_hour * luggageNum
    }
    else {
        cost = round * price_per_hour * luggageNum
    }
    
    return cost
}

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSubmit = () => {
    // amount: price_per_hour, start, end, luggage num
    // for DB: store_id, start, end, luggage_um
    const finalCost = getCost()
    alert(finalCost)
    history.push('/payment', {
      pickUpDate,
      dropOffDate,
      cost: finalCost
    })

    // setMessage("Booking Confirmed")
    // setOpenAlert(true)
    // setColor("success")
  };

  return (
    <div>
      <Button className="trigger-button" variant="outlined" color="primary" onClick={handleClickOpen}>
        Book Now
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openModal}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} className='dialogTitle'>
          Booking
        </DialogTitle>
        <DialogContent dividers>
        <BasicDateTimePicker 
          setDropOffDate={setDropOffDate}
          setPickUpDate={setPickUpDate}
          setLuggageNum={setLuggageNum}
          dropOffDate={dropOffDate}
          pickUpDate={pickUpDate}
          luggageNum={luggageNum}
        />
        </DialogContent>
        <DialogActions>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              Total:
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h4">
              { getCost() }
            </Typography>
          </Grid>
        </Grid>
        </DialogActions>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            BOOK NOW
          </Button>
      </Dialog>
    </div>
  );
}