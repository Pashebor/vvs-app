export const filterSearch = (state, filterState, type)=> {
    let filteredState = state.filter( element => {
        if (type === 'users') {
            return (element.ID == filterState) ||
                (element.EMAIL.toLowerCase().indexOf(filterState.toLowerCase()) !== -1) ||
                (element.NAME.toLowerCase().indexOf(filterState.toLowerCase()) !== -1);
        } else if(type === 'reports') {
            return (element.id == filterState) ||
                (element.name.toLowerCase().indexOf(filterState.toLowerCase()) !== -1) ||
                (element.date.toLowerCase().indexOf(filterState.toLowerCase()) !== -1);
        }
    });
    return filteredState;
};