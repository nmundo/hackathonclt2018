import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

function MenuBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.handleDrawerToggle}
                        className={classes.navIconHide}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit">
                        Home Sweet Home
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

MenuBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuBar);