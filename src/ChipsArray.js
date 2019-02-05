import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    chip: {
        //margin: theme.spacing.unit / 2,
        margin: "60px"
    },
});

class ChipsArray extends React.Component {
    state = {
        chipData: [
            { key: 0, label: 'XS' },
            { key: 1, label: 'S' },
            { key: 2, label: 'M' },
            { key: 3, label: 'ML' },
            { key: 4, label: 'L' },
            { key: 5, label: 'XL' },
            { key: 6, label: 'XXL' },
        ],
    };

    handleDelete = data => () => {
        if (data.label === 'React') {
            alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
            return;
        }

        this.setState(state => {
            const chipData = [...state.chipData];
            const chipToDelete = chipData.indexOf(data);
            chipData.splice(chipToDelete, 1);
            return { chipData };
        });
    };

    handleClick = key => () => {
        this.props.chipClickHandler(key);
    }

    render() {
        //console.log("props sizes ===> ", this.props.sizes);
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                {this.state.chipData.map(data => {
                    //console.log("data =====>???  ", data);

                    let icon = null;

                    return (
                        <Chip
                            key={data.key}
                            label={data.label}
                            onClick={this.handleClick(data.label)}
                            className={classes.chip}
                        />
                    );
                })}
            </Paper>
        );
    }
}

ChipsArray.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipsArray);
