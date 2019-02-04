import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
});

class CheckboxesGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        console.log("props sizes ===> ", this.props.sizes);
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Select Size</FormLabel>
                    {this.props.sizes.map(size => (
                        <FormGroup>
                            <FormControlLabel
                                label={size.value}
                                control={
                                    <Checkbox checked={size.checked}/>
                                }
                            />
                        </FormGroup>))}
                </FormControl>
            </div>
        );
    }
}

CheckboxesGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxesGroup);