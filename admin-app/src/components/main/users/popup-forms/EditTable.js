import React from 'react';

const EditTable = props => {
    return(
        <table>
            <thead>
            <tr>
                <th>№ отчета</th>
                <th>Название</th>
                <th>Владелец</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{props.editData.REPORT_ID}</td>
                <td>{props.editData.REPORT_NAME}</td>
                <td>{props.editData.NAME}</td>
            </tr>
            </tbody>
        </table>
    )
};

export default EditTable;