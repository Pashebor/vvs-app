import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {filterAction} from '../../actions/index';

class Search extends React.Component{
    
    searchHandler (event) {
        event.preventDefault();
        this.props.filterAction(event.target.value);
    }
    
    render(){
        console.log(this);
        return(
            <div className="search-block">
            <input type="text" className="search-field" onChange={this.searchHandler.bind(this)} placeholder="Поиск..."/>
            <button className="search-btn"></button>
           </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        filterState: store.filterState
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({filterAction}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);