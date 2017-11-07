import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closePopupForms, getReports } from '../../../../actions/index';

class PopupForms extends Component{
    componentDidMount() {
        this.props.getReports();
    }
    closeModalHandler() {
        const popupFormData = {
            type: '',
            state: false,
            data: null
        };
        this.props.closePopupForms(popupFormData);
    }

    addReportHandler(event) {
        console.log(event.target)
    }

    showReportsTags() {
        return this.props.reports.map( (report, i) => {
            return (<button key={i} data-id={report.id} data-assoc={report.assocName} onClick={this.addReportHandler.bind(this)}>{report.name}</button>)
        })
    }

    render() {
        console.log(this.props.reports);
        return(
            <section className="popup-form-overlay" >
                <div className="popup-form">
                    <p className="popup-form__close" onClick={this.closeModalHandler.bind(this)}></p>
                    <h2 className="popup-form__title">Добавление отчета</h2>
                    <h5 className="popup-form__message">Список доступных отчетов</h5>
                    <div className="popup-form__body">
                        {this.showReportsTags()}
                    </div>
                    <button className="btn btn-submit">OK</button>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        popupFormsState: store.popupFormsReducer,
        reports: store.tablesReducer.reports
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({closePopupForms, getReports}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PopupForms);