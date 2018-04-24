import React, { Component } from 'react'
import axios from 'axios';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

export default class MoreInfo extends Component {
    state = {
        data: [{}]
    };

    componentWillMount() {
        axios.post('http://www.nathanmundo.com/api/npalookup', {
            "NPA": this.props.npa,
        }).then(res => {
            const data = res.data;
            this.setState({ data: JSON.parse(data) });
            console.log(this.state.data[0].NPA);
        });
    }

    render() {
        return (
            <div>
                <List>
                    <ListItem>
                        NPA: {this.props.npa}
                    </ListItem>
                    <ListItem>
                        Address: {this.props.npa}
                    </ListItem>
                    <ListItem>
                        Proximity to Transit: {this.state.data[0].proximity_from_public_transport}
                    </ListItem>
                    <ListItem>
                        Crime Rate: {this.state.data[0].crime_rates}
                    </ListItem>
                    <ListItem>
                        Child Care: {this.state.data[0].child_care}
                    </ListItem>
                    <ListItem>
                        School Ratings
                    </ListItem>
                    <ListItem>
                        Elementary: {this.state.data[0].elementary_school_proficiency}
                    </ListItem>
                    <ListItem>
                        Middle: {this.state.data[0].middle_school_proficiency}
                    </ListItem>
                    <ListItem>
                        High: {this.state.data[0].high_school_proficiency}
                    </ListItem>
                </List>
            </div>
        )
    }
}