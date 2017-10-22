import {GET_USERS, GET_REPORTS, ADD_USER, MODAL_SHOW} from '../actions/constants';

const initialState = {
    users: [],
    reports:  [{
        id: 1,
        name: "Поставки отсюда",
        date: '12.07.2017'
    },{
        id: 2,
        name: "Поставки туда",
        date: '13.07.2017'
    },{
        id: 3,
        name: "Ежемесячный отчет",
        date: '14.07.2017'
    }, {
        id: 4,
        name: "Вычет торговых предложений",
        date: '15.07.2017'
    }, {
        id: 5,
        name: "Расчет поставок",
        date: '16.07.2017'
    }, {
        id: 6,
        name: "Перерасчет чего-то",
        date: '20.07.2017'
    }, {
        id: 16,
        name: "Перерасчет чего-то",
        date: '20.07.2017'
    }
    ],
    isShowModal: false
};

const tablesReducer = (state = initialState, action = {}) => {
    switch (action.type){
        case GET_USERS:
            return Object.assign({}, state, {users: action.payload});
        case GET_REPORTS:
            return Object.assign({}, state, {reports: action.payload});
        case ADD_USER:
            return Object.assign({}, state, {users: [...state.users, {
                ID: action.payload.ID,
                NAME: action.payload.NAME,
                EMAIL: action.payload.EMAIL,
                PASSWORD: action.payload.PASSWORD
            }]});
        case MODAL_SHOW:
            return Object.assign({}, state, {isShowModal: action.isShown})
    }
    return state;
};

export default tablesReducer;