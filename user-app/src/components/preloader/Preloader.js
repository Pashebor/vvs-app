import React from 'react';

const Preloader = () =>{
    return (
       <section className="popup-overlay">
            <div className="cssload-tetrominos">
                <div className="cssload-tetromino cssload-box1"></div>
                <div className="cssload-tetromino cssload-box2"></div>
                <div className="cssload-tetromino cssload-box3"></div>
                <div className="cssload-tetromino cssload-box4"></div>
            </div>
       </section>
    )
};

export default Preloader;