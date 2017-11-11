import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closePopupForms, getReports, addReportToUser } from '../../../../actions/index';

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
        const userData = this.props.popupFormsState.popupFormsData;
        const ownerData = new FormData();
        ownerData.append('reportId', event.target.getAttribute('data-id'));
        ownerData.append('reportAssocName', event.target.getAttribute('data-assoc'));
        ownerData.append('reportName', event.target.getAttribute('data-name'));
        ownerData.append('userId', userData.ID);
        ownerData.append('userName', userData.NAME);
        ownerData.append('popupForms', true);
        this.props.addReportToUser(ownerData);

        for (let button in this.refs) {
            if(button !== `report-${event.target.getAttribute('data-count')}`) {
                this.refs[button].style.display = 'none';
            }
        }
    }

    showReportsTags() {
        return this.props.reports.map( (report, i) => {
            return (<button key={i} ref={`report-${i}`} data-count={i} data-id={report.id} data-assoc={report.assocName} data-name={report.name} onClick={this.addReportHandler.bind(this)}>{report.name}</button>)
        })
    }

    render() {
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
    return bindActionCreators({closePopupForms, getReports, addReportToUser}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PopupForms);