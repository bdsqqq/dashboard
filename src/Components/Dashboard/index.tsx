import React from 'react';
import { app } from '../../firebase'
import Folio from '../Folio'

const Dashboard = () =>{
    return(
        <>
            <h1>Hej dö world</h1>
            <Folio />
            <button onClick={() => app.auth().signOut()}>Sign Out</button>
        </>
    )
}

export default Dashboard;