import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';

const styles = theme => ({
    typography: {
        margin: theme.spacing.unit * 2,
    },
});

class SimplePopover extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <Button
                    aria-owns={open ? 'simple-popper' : undefined}
                    aria-haspopup="true"
                    variant="contained"
                    onClick={this.handleClick}
                >
                    Checkout!
                </Button>
                <Popover
                    id="simple-popper"
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    {/*<Typography className={classes.typography}>The content of the Popover.</Typography>*/}
                    <div>
                        {
                            Object.keys(this.props.items).map(id => {
                                if (this.props.items[id].quantity > 0) {
                                    return <CartItem info={this.props.items[id]} addCallback={this.props.addCallback}
                                                     removeCallback={this.props.removeCallback}/>
                                }
                            })
                        }
                        <hr></hr>
                    </div>
                </Popover>
            </div>
        );
    }
}


const CartItem = (props) => {
    return (
        <div>
            <img src={require(`./static/data/products/${props.info.sku}_2.jpg`)} alt=""/>
            <div>{props.info.title}</div>
            <div>{`${props.info.price} x ${props.info.quantity} = ${props.info.price * props.info.quantity}`}</div>
            <span>
            <button onClick={() => props.addCallback(props.info)}>Add</button>
            <button onClick={() => props.removeCallback(props.info)}>Remove</button>
          </span>
        </div>
    )
}

SimplePopover.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimplePopover);