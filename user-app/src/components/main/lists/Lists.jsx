import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListOne from './ListOne';
import ListTwo from './ListTwo';
import ListThree from './ListThree';
import ListFour from './ListFour';
import ListFive from './ListFive';
import LeftSideBar from '../sidebar/LeftSideBar';
import {routeCodes} from '../../../utils/route.path';
import {getLists} from '../../../actions/index';

class Lists extends Component{
    constructor(props) {
        super(props);
        this.getLists = props.getLists;
    }
    componentDidMount() {
        if(!this.props.reportData) {
            this.props.history.push(routeCodes.MAIN);
        } else {
            this.reportId = this.props.reportData.id;
            if(!this.props.lists.listOne) {
                this.getLists(this.reportId);
            }
        }
    }
    
    printLists () {
            switch (this.props.match.params.list) {
                case 'one':
                    if (this.props.lists.listOne) {
                        return <ListOne listData={this.props.lists.listOne}/>;
                    }
                    break;
                case 'two':
                    if (this.props.lists.listTwo) {
                        return <ListTwo listData={this.props.lists.listTwo}/>;
                    }
                    break;
                case 'three':
                    if (this.props.lists.listThree) {
                        return <ListThree listData={this.props.lists.listThree}/>;
                    }
                    break;
                case 'four':
                    if(this.props.lists.listFour) {
                        return <ListFour listData={this.props.lists.listFour}/>;
                    }
                    break;
                case 'five':
                    if(this.props.lists.listFive) {
                        return <ListFive listData={this.props.lists.listFive}/>;
                    }
                    break;
            }
    }

    render() {
        return(
            <section className="lists">
                <LeftSideBar/>
                {this.printLists()}
            </section>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        lists: store.listsStore,
        reportData: store.mainStore.userReport
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({getLists}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Lists);