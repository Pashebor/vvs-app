import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {uploadReports} from '../../../actions/index';
import Modal from '../../modal-window/Modal.jsx';


class ReportsAdd extends React.Component{
    createAReportHandler(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('file_name', this.refs['file-name'].value);
        formData.append('file_one', this.refs['file1'].files[0]);
        formData.append('file_two', this.refs['file2'].files[0]);
        formData.append('file_three', this.refs['file3'].files[0]);
        formData.append('file_four', this.refs['file4'].files[0]);
        formData.append('file_five', this.refs['file5'].files[0]);
        this.props.uploadReports(formData);
        for (let field in this.refs) {
            this.refs[field].value = '';
        }
    }
    render() {
        return(
            <div className="reports-add">
                {this.props.modalIsShown ? <Modal title="Добавление отчета" message="Отчет успешно добавлен"/> : null}
                <h2 className="title">Добавить отчет</h2>
                <form className="reports-add-form" onSubmit={this.createAReportHandler.bind(this)}>
                    <input className="input-field" type="text" placeholder="Название отчета" ref="file-name" required/>
                    <h4>Загрузка таблиц</h4>
                    <input type="file" placeholder="Лист 1" ref="file1" required/>
                    <input type="file" placeholder="Лист 2" ref="file2" required/>
                    <input type="file" placeholder="Лист 3" ref="file3" required/>
                    <input type="file" placeholder="Лист 4" ref="file4" required/>
                    <input type="file" placeholder="Лист 5" ref="file5" required/>
                    <input type="submit" className="btn btn-submit" value="Создать отчет"/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        modalIsShown: store.tablesReducer.isShowModal
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({uploadReports}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsAdd);