import React, { FunctionComponent } from 'react';
import './styles/SystemStatus.css';

import AnalogClock, { Themes } from 'react-analog-clock';
import moment from 'moment';

type SystemStatusProps = {
    timeToTurnSystemOn: string,
    timeToTurnSystemOff: string,
    reservoirRefillCadence: Date,
    reservoirCleanCadence: Date,
    reservoirMaxCapacity: String,
    nutrientsRefillCadene: Date,
    nutrientsRefillAmount: String,
    currentTime: String,
}

const calculateTimeLightWillBeOn = (turnOnTime: string, turnOffTime: string): string | null => {
    if (turnOffTime > turnOnTime) {
        return moment.utc(moment(turnOffTime,"HH:mm").diff(moment(turnOnTime,"HH:mm"))).format('HH:mm');
    }
    return moment.utc(moment('24:00', 'HH:mm').diff(moment(turnOnTime,"HH:mm"))).add(moment(turnOffTime,"HH:mm").hour(), 'hours').format('HH:mm');
}

const calculateRemainingTimeLightWillBeOn = (turnOnTime: string , turnOffTime: string): string => {
    if (turnOffTime < turnOnTime) {
        if (moment().isBetween(moment(turnOffTime,"HH:mm"), moment("24:00","HH:mm"))) {
            return moment.utc(moment(turnOffTime,"HH:mm").diff(moment())).format('HH:mm');
        }
    }
    if (moment().isBetween(moment(turnOnTime,"HH:mm"), moment(turnOffTime,"HH:mm"))) {
        return moment.utc(moment(turnOffTime,"HH:mm").diff(moment())).format('HH:mm');
    }
    return '0:00';
}

const displayCycleTime = (turnOnTime: string , turnOffTime: string): string => {
    if (moment.duration(calculateRemainingTimeLightWillBeOn(turnOnTime, turnOffTime)).asMinutes() > 0) {
        return `${calculateRemainingTimeLightWillBeOn(turnOnTime, turnOffTime)} / ${calculateTimeLightWillBeOn(turnOnTime, turnOffTime)}`;
    }
    return 'Cycle Complete';
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
                <div className='SystemStatus-lightCycle-time'>
                    {displayCycleTime(timeToTurnSystemOn, timeToTurnSystemOff)}
                </div>
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