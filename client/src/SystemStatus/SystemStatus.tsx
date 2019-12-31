import React, { Component } from 'react';
import './styles/SystemStatus.css';

import AnalogClock, { Themes } from 'react-analog-clock';
import moment from 'moment';

type SystemStatusProps = {
    timeToTurnSystemOn: string,
    timeToTurnSystemOff: string,
    reservoirRefillCadence: Date,
    reservoirCleanCadence: Date,
    reservoirMaxCapacity: string,
    nutrientsRefillCadene: Date,
    nutrientsRefillAmount: string,
    currentTime: string,
}

type SystemStatusState = {
    currentTurnOnTime: string,
    currentTurnOffTime: string,
}

const calculateTimeLightWillBeOn = (turnOnTime: string, turnOffTime: string): string | null => {
    if (turnOffTime > turnOnTime) {
        return moment.utc(moment(turnOffTime,"HH:mm").diff(moment(turnOnTime,"HH:mm"))).format('HH:mm');
    }
    return moment.utc(moment('24:00', 'HH:mm').diff(moment(turnOnTime,"HH:mm"))).add(moment(turnOffTime,"HH:mm").hour(), 'hours').add(moment(turnOffTime,"HH:mm").minute(), 'minutes').format('HH:mm');
}

const calculateRemainingTimeLightWillBeOn = (turnOnTime: string , turnOffTime: string): string => {
    const currentTime = moment();
    const cycleTime = moment.utc(moment(turnOffTime,"HH:mm").diff(currentTime)).format('HH:mm');

    if (turnOffTime < turnOnTime) {
        if (currentTime.isBetween(moment(turnOffTime,"HH:mm"), moment("24:00","HH:mm")) && currentTime.isSameOrAfter(moment(turnOnTime,"HH:mm"))) {
            return cycleTime;
        }

        if(currentTime.isBetween(moment("00:00","HH:mm"), moment(turnOffTime,"HH:mm"))) {
            return cycleTime;
        }
    }
    if (currentTime.isBetween(moment(turnOnTime,"HH:mm"), moment(turnOffTime,"HH:mm"))) {
        return cycleTime;
    }
    return '0:00';
}

class SystemStatus extends Component<SystemStatusProps, SystemStatusState> {

    constructor(props: SystemStatusProps) {
        super(props);

        this.state={
            currentTurnOnTime: this.props.timeToTurnSystemOn,
            currentTurnOffTime: this.props.timeToTurnSystemOff,
        };

        this.updateTime = this.updateTime.bind(this);
        this.updateTurnOnTime = this.updateTurnOnTime.bind(this);
        this.updateTurnOffTime = this.updateTurnOffTime.bind(this);
    }

    async updateTime() {
        const initialData = await fetch('/update/pump/cycletime', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                timeToTurnSystemOn: this.state.currentTurnOnTime,
                timeToTurnSystemOff: this.state.currentTurnOffTime,
            }),
          });
      
          const parsedData = await initialData.json();
          return null;
    }

    updateTurnOnTime(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ currentTurnOnTime: e.target.value});
    }

    updateTurnOffTime(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ currentTurnOffTime: e.target.value});
    }

    displayCycleTime(turnOnTime: string , turnOffTime: string): string | React.ReactNode {
        if (moment.duration(calculateRemainingTimeLightWillBeOn(turnOnTime, turnOffTime)).asMinutes() > 0) {
            return `${calculateRemainingTimeLightWillBeOn(turnOnTime, turnOffTime)} / ${calculateTimeLightWillBeOn(turnOnTime, turnOffTime)}`;
        }
        return (
            <div>
                <div>Cycle Complete</div>
                <div>Next Cycle:
                    <input className='SystemStatus-inputField' onChange={this.updateTurnOnTime} value={this.state.currentTurnOnTime} type='text' placeholder={turnOnTime} />
                    <span>-</span>
                    <input className='SystemStatus-inputField' onChange={this.updateTurnOffTime} value={this.state.currentTurnOffTime} type='text' placeholder={turnOffTime} />
                </div>
                <button onClick={this.updateTime}>Save</button>
            </div>
        )
    }

    render() {
        return (
            <div className='SystemStatus'>
                <div className='SystemStatus-clock'>
                    <AnalogClock theme={Themes.dark} width={200}/>
                </div>
                <div className='SystemStatus-info'>
                    <div className='SystemStatus-lightCycle-icon'>sun</div>
                    <div className='SystemStatus-lightCycle-time'>
                        {this.displayCycleTime(this.props.timeToTurnSystemOn, this.props.timeToTurnSystemOff)}
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
        );
    }

}

export default SystemStatus;