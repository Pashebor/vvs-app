import React from 'react';

class Search extends React.Component{
    render(){
        return(
           <div className="search-block">
            <input type="text" className="search-field" placeholder="Поиск..."/>
            <button className="search-btn"></button>
           </div>
        )
    }
}

export default Search;