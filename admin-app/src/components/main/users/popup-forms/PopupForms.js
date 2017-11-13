import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {isEmpty} from '../../../../utils/object-checker';
import { closePopupForms, getReports, addReportToUser, deleteReportFromUser } from '../../../../actions/index';
import Notifcation from './Notifcation';
import EditTable from './EditTable';

class PopupForms extends Component{
    constructor() {
        super();
        this.reportOwner = {};
        this.state = {isShow: false, message: '', type: ''}
    }
    componentDidMount() {
        this.props.getReports();
    }
    closeModalHandler() {
        const popupFormData = {type: '', state: false, data: null};
        this.props.closePopupForms(popupFormData);
        this.reportOwner = {};
    }

    addReportHandler(event) {
        const userData = this.props.popupFormsState.popupFormsData;
        this.reportOwner.reportId = event.target.getAttribute('data-id');
        this.reportOwner.reportAssocName = event.target.getAttribute('data-assoc');
        this.reportOwner.reportName = event.target.getAttribute('data-name');
        this.reportOwner.userId = userData.ID;
        this.reportOwner.userName = userData.NAME;
        this.reportOwner.popupForms = true;

        for (let button in this.refs) {
            if(button === `report-${event.target.getAttribute('data-count')}`) {
                this.refs[button].classList.add('popup-form__tag--active');
            } else {
                this.refs[button].classList.remove('popup-form__tag--active');
            }
        }
    }
    sendOwnerDataHandler() {
        if (!isEmpty(this.reportOwner)) {
            const ownerData = new FormData();
            ownerData.append('reportId', this.reportOwner.reportId);
            ownerData.append('reportAssocName', this.reportOwner.reportAssocName);
            ownerData.append('reportName', this.reportOwner.reportName);
            ownerData.append('userId', this.reportOwner.userId);
            ownerData.append('userName', this.reportOwner.userName);
            ownerData.append('popupForms', this.reportOwner.popupForms);
            this.props.addReportToUser(ownerData);
            this.setState ({
                isShow: true,
                message: 'Отчет добавлен',
                type: 'popup-form__notification--success'
            });
        } else {
            this.setState ({
                isShow: true,
                message: 'Отчет не выбран!',
                type: 'popup-form__notification--error'
            });
        }
    }
    showReportsTags() {
        return this.props.reports.map( (report, i) => {
            return (<button title="Выбрать отчет" className="popup-form__tag" key={i} ref={`report-${i}`} data-count={i} data-id={report.id} data-assoc={report.assocName} data-name={report.name} onClick={this.addReportHandler.bind(this)}>{report.name}</button>)
        })
    }
    deleteReportHandler() {
        const userData = {userId: this.props.popupFormsState.popupFormsData.ID};
        this.props.deleteReportFromUser(JSON.stringify(userData));
        this.setState ({
            isShow: true,
            message: 'Отчет удален',
            type: 'popup-form__notification--success'
        });
    }
    showFormByType() {
        switch (this.props.popupFormsState.popupFormType) {
            case 'add':
                return (<div className="popup-form">
                    <p className="popup-form__close" onClick={this.closeModalHandler.bind(this)}></p>
                    <h2 className="popup-form__title">Добавление отчета</h2>
                    <h5 className="popup-form__message">Список доступных отчетов</h5>
                    {this.state.isShow ? <Notifcation message={this.state.message} type={this.state.type}/> : null}
                    <div className="popup-form__body">
                        {this.showReportsTags()}
                    </div>
                    <div className="popup-form__buttons">
                        <button className="btn btn-submit" onClick={this.sendOwnerDataHandler.bind(this)}>Подтвердить</button>
                        <button className="btn btn-cancel" onClick={this.closeModalHandler.bind(this)}>Отмена</button>
                    </div>
                </div>);
                break;
            case 'edit':
               const editData = this.props.popupFormsState.popupFormsData;
                return (<div className="popup-form">
                    <p className="popup-form__close" onClick={this.closeModalHandler.bind(this)}></p>
                    <h2 className="popup-form__title">Удаление отчета</h2>
                    <h5 className="popup-form__message">Отчет пользователя</h5>
                    {this.state.isShow ? <Notifcation message={this.state.message} type={this.state.type}/> : null}
                    <div className="popup-form__body" style={{overflowY: 'hidden'}}>
                        {<EditTable editData={editData}/>}
                    </div>
                    <div className="popup-form__buttons">
                        <button className="btn btn-submit" onClick={this.deleteReportHandler.bind(this)}>Удалить</button>
                        <button className="btn btn-cancel" onClick={this.closeModalHandler.bind(this)}>Отмена</button>
                    </div>
                </div>);
                break;
        }
    }
    render() {
        return(
            <section className="popup-form-overlay" >
                {this.showFormByType()}
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
    return bindActionCreators({closePopupForms, getReports, addReportToUser, deleteReportFromUser}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PopupForms);