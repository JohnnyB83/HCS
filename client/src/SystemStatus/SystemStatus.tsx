import React, { FunctionComponent } from 'react';
import './styles/SystemStatus.css';

type SystemStatusProps = {
    timeSystemHasBeenOn: Date,
    totalTimeSystemWillBeOn: Date,
    reservoirRefillCadence: Date,
    reservoirCleanCadence: Date,
    reservoirMaxCapacity: String,
    nutrientsRefillCadene: Date,
    nutrientsRefillAmount: String,
}

const SystemStatus: FunctionComponent<SystemStatusProps> = ({ 
    timeSystemHasBeenOn,
    totalTimeSystemWillBeOn,
    reservoirRefillCadence,
    reservoirCleanCadence,
    reservoirMaxCapacity,
    nutrientsRefillCadene,
    nutrientsRefillAmount,
}) => {
    return (
        <div className='SystemStatus'>
            <div className='SystemStatus-clock'>

            </div>
            <div className='SystemStatus-icons'>
                
            </div>
            <div className='SystemStatus-timeData'>
                
            </div>
            <div className='SystemStatus-stateData'>
                
            </div>
        </div>
    )

}

export default SystemStatus;