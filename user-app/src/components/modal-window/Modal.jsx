import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {showModal} from '../../actions/index';


class Modal extends React.Component{
    closeModalHandler() {
        this.props.showModal(false);
    }
    
    render() {
        return (
            <section className="popup-overlay" onClick={this.closeModalHandler.bind(this)}>
                <div className="popup">
                    <p className="popup__close"></p>
                    <div>
                        <h2 className="popup__title">{this.props.title}</h2>
                        <p className="popup__message">{this.props.message}</p>
                    </div>
                    <button className="btn btn-submit">OK</button>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (store) => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({showModal}, dispatch);
};

export default connect (mapStateToProps, mapDispatchToProps)(Modal);