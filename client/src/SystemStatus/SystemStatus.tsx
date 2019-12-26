import React, { FunctionComponent } from 'react';
import './styles/SystemStatus.css';

import AnalogClock, { Themes } from 'react-analog-clock';
import moment from 'moment';

type SystemStatusProps = {
    timeToTurnSystemOn: String,
    timeToTurnSystemOff: String,
    reservoirRefillCadence: Date,
    reservoirCleanCadence: Date,
    reservoirMaxCapacity: String,
    nutrientsRefillCadene: Date,
    nutrientsRefillAmount: String,
    currentTime: String,
}

const calculateHoursLightIsOn = (turnOnTime: string, turnOffTime: string): string => {
    return '';
}

const SystemStatus: FunctionComponent<SystemStatusProps> = ({ 
    timeToTurnSystemOn,
    timeToTurnSystemOff,
    reservoirRefillCadence,
    reservoirCleanCadence,
    reservoirMaxCapacity,
    nutrientsRefillCadene,
    nutrientsRefillAmount,
    currentTime,
}) => {
    return (
        <div className='SystemStatus'>
            <div className='SystemStatus-clock'>
                <AnalogClock theme={Themes.dark} width={200}/>
            </div>
            <div className='SystemStatus-info'>
                <div className='SystemStatus-lightCycle-icon'>sun</div>
                <div className='SystemStatus-lightCycle-time'>{currentTime}</div>
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