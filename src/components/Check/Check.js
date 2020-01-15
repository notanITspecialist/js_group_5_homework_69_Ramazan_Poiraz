import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import ListGroup from "reactstrap/es/ListGroup";
import ListGroupItem from "reactstrap/es/ListGroupItem";

import './Check.css'
import {deleteDishFromCheck, resetCheck, sendOrder} from "../../actions/actions";
import ModalForm from "../ModalForm/ModalForm";

class Check extends Component {
    state = {
      showModal: false,
        address: '',
        name: '',
        phoneNumber: ''
    };

    changeText = e => {
      this.setState({[e.target.name]: e.target.value})
    };

    showModal = () => {
      this.setState({showModal: true})
    };

    closeModal = e => {
        e.preventDefault();
        this.setState({showModal: false})
    };

    sendAnOrder = async e => {
        e.preventDefault();
        const checkInfo = this.props.check.reduce( (arr, elem) => {
            if(elem.quantity > 0){
                arr.push({name: elem.name, quantity: elem.quantity});
                return arr
            } else {
                return arr
            }
        },[]);
      const sendInfo = {
          customerInfo: {
              address: this.state.address,
              name: this.state.name,
              phoneNumber: this.state.phoneNumber
          },
          check: checkInfo
      };
      await this.props.sendOrder(sendInfo);
        this.props.resetCheck();
        this.setState({
            showModal: false,
            address: '',
            name: '',
            phoneNumber: ''
        })
    };

    render() {
        return (
            <Fragment>
                <ListGroup className='w-25'>
                    <ListGroupItem active >CHECK</ListGroupItem>
                    {this.props.check.map((elem, id)=> (
                        elem.quantity > 0 &&
                        <ListGroupItem onClick={() => this.props.deleteDishFromCheck(elem.name)} className='check-elem' key={elem.name + id} tag="button">
                            <span className='check-elem-name'>{elem.name}</span>
                            <span className='check-elem-quantity'>X: {elem.quantity}</span>
                            <span className='check-elem-price'>price: {elem.price}</span>
                        </ListGroupItem>
                    ))}
                    <ListGroupItem className='border-top' >
                        <span className='check-elem-name'>Delivery</span>
                        <span className='check-elem-price'>price: 150</span>
                    </ListGroupItem>
                    <ListGroupItem className='border-top' >
                        <span className='check-elem-name'>Total</span>
                        <span className='check-elem-price'>price: {this.props.totalPrice}</span>
                    </ListGroupItem>
                    {this.props.totalPrice > 150 && <ListGroupItem onClick={this.showModal} tag='button'>Place order</ListGroupItem>}
                </ListGroup>
                <ModalForm show={this.state.showModal} close={this.closeModal}>
                    <form onSubmit={this.sendAnOrder}>
                        <label className='modalFormCheck'><input required onChange={this.changeText} value={this.state.address} name='address' /> Address</label>
                        <label className='modalFormCheck'><input required onChange={this.changeText} value={this.state.name} name='name' /> Name</label>
                        <label className='modalFormCheck'><input required onChange={this.changeText} value={this.state.phoneNumber} name='phoneNumber' /> Phone number</label>
                        <button className='ModalButton' type='submit'>Submit</button>
                    </form>
                </ModalForm>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    check: state.check.check,
    totalPrice: state.check.totalPrice
});

const mapDispatchToProps = dispatch => ({
    deleteDishFromCheck: name => dispatch(deleteDishFromCheck(name)),
    sendOrder: data => sendOrder(data),
    resetCheck: () => dispatch(resetCheck())
});

export default connect(mapStateToProps,mapDispatchToProps)(Check);