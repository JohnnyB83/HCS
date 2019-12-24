import React, { FunctionComponent } from 'react';
import './styles/SystemStatus.css';

import AnalogClock, { Themes } from 'react-analog-clock';

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
                <AnalogClock theme={Themes.dark} width={200}/>
            </div>
            <div className='SystemStatus-info'>
                <div className='SystemStatus-lightCycle-icon'>sun</div>
                <div className='SystemStatus-lightCycle-time'>5:32 / 17</div>
                <div className='SystemStatus-lightCycle-plantState'>plant</div>

                <div className='SystemStatus-reservoir-icon'>reservoir</div>
                <div className='SystemStatus-reservoir-time'>5 days</div>
                <div className='SystemStatus-reservoir-amount'>15 Gal</div>

                <div className='SystemStatus-nutrients-icon'>nutrients</div>
                <div className='SystemStatus-nutrients-time'>5 days</div>
                <div className='SystemStatus-nutrients-amount'>15 Tbsp</div>
            </div>
        </div>
    )

}

export default SystemStatus;