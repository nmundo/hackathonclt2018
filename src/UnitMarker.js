import React, { Component } from 'react'
import {CircleMarker, Popup } from 'react-leaflet'
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import MoreInfo from './MoreInfo';
import Icon from 'material-ui/Icon';
import green from 'material-ui/colors/green';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export default class UnitMarker extends Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <CircleMarker center={this.props.position} radius={5}>
                <Popup>
                    <div>
                        Name: {this.props.name}<br/>
                        Address: {this.props.address}<br/>
                        Accepts Section 8: <Icon style={{ fontSize: 22, color: green[200] }}>done</Icon><br/>
                        <Button variant="raised" color="primary" onClick={this.handleClickOpen}>
                            More Info
                        </Button>
                        <Dialog
                            open={this.state.open}
                            transition={Transition}
                            keepMounted
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle id="alert-dialog-slide-title">
                                {this.props.name}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    <MoreInfo npa={this.props.npa}/>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    Done
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Popup>
            </CircleMarker>
        )
    }
}