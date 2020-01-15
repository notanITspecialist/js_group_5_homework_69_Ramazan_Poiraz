import React, {Component} from 'react';
import {addDishToCheck, getMenu} from "../../actions/actions";
import {connect} from "react-redux";
import ListGroup from "reactstrap/es/ListGroup";
import ListGroupItem from "reactstrap/es/ListGroupItem";

import './Menu.css'

class Menu extends Component {
    componentDidMount() {
        this.props.getMenu()
    }

    render() {
        return (
                <ListGroup className=' w-50 '>
                    <ListGroupItem active >MENU</ListGroupItem>
                    {Object.keys(this.props.menu).map((elem, id) => (
                        <ListGroupItem onClick={() => this.props.addDish(elem)} className='menu-elem' key={elem + id} tag="button" action>
                            <img className='menu-img' alt={elem} src={this.props.menu[elem].img} />
                            <span className='menu-elem-name'>{elem}</span>
                            <span className='menu-elem-price'>price: {this.props.menu[elem].price}</span>
                        </ListGroupItem>
                    ))}
                </ListGroup>
        );
    }
}

const mapStateToProps = state => ({
    menu: state.menu.menu
});

const mapDispatchToProps = dispatch => ({
    getMenu: () => dispatch(getMenu()),
    addDish: name => dispatch(addDishToCheck(name))
});

export default connect(mapStateToProps,mapDispatchToProps)(Menu);