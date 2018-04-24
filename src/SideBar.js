import React, { Component } from 'react'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import { withStyles } from 'material-ui/styles';
import { InputAdornment } from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import axios from 'axios';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '15px',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
});

class SideBar extends Component {

    state = {
        checkedSec8: false,
        income: 0,
        address: null,
        addressQOL: 0
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleChangeRadio = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    getQOLForAddress()  {
        console.log(this.state.address);
        axios.post('http://www.nathanmundo.com/api/addressQOL', {
            "Address": this.state.address,
        }).then(res => {
            const data = res.data;
            this.setState({ addressQOL: JSON.parse(data) });
            console.log(this.state.addressQOL);
        });
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={"sidebar"}>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="income"
                        label="Income"
                        onChange={this.handleChange('income')}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />
                    <TextField
                        id="household_size"
                        label="Household Size"
                        onChange={this.handleChange('household_size')}
                        className={classes.textField}
                        margin="normal"
                        style={{width: 120}}
                    />
                    <Typography variant="caption" gutterBottom className={classes.textField}>
                        Max recommended rent: {this.state.income * 0.3}
                    </Typography>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.checkedSec8}
                                    onChange={this.handleChangeRadio('checkedSec8')}
                                    value="checkedSec8"
                                    color="primary"
                                />
                            }
                            label="Section 8 Friendly"
                        />
                    </FormGroup>
                    <Button variant="raised" color="primary">
                        Find
                    </Button>
                    <Divider />
                    <br/><br/>
                    <Typography variant="display1" align="center" style={{paddingTop: 25}}>
                        Look Up Current Neighborhood
                    </Typography>
                    <TextField
                        id="address"
                        label="Current Address"
                        onChange={this.handleChange('address')}
                        className={classes.textField}
                        margin="normal"
                    />
                    <Button variant="raised" color="primary" onClick={this.getQOLForAddress()}>
                        Search
                    </Button>
                    <Typography variant="caption" gutterBottom className={classes.textField}>
                        QOL for Address: {this.state.addressQOL}
                    </Typography>
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(SideBar)