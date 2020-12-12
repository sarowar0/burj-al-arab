import React from 'react';
import Room from '../Room/Room';
import Datas from '../../fakeData/fakeData.json';
import './Home.css';

const Home = () => {

    return (
        <div className='container'>
            <div className="row">
                {
                    Datas.map(data => <Room room={data} key={data.Id}></Room>)
                }
            </div>
        </div>
    );
};

export default Home;