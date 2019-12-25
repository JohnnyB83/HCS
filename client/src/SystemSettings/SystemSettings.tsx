import React, { FunctionComponent } from 'react';
import './styles/SystemSettings.css';

import Plant from '../Types/Types';

type SystemSettingsProps = {
    selectedPlants: Array<Plant>,
}

const SystemSettings: FunctionComponent<SystemSettingsProps> = ({ 
    selectedPlants,
}) => {
    if (selectedPlants.length === 0) {
        return null;
    }
    return (
        <div className='SystemSettings'>
            <div className='SystemSettings-paneTitle'>Plants Selected: {selectedPlants.length}</div>
            <div className='SystemSettings-plantState'>
                <div>icon</div>
                <div>icon</div>
                <div>icon</div>
            </div>
            <div className='SystemSettings-plantInfo'>
                
            </div>
            <div className='SystemSettings-plantSaveSettings'>
                
                </div>
        </div>
    )

}

export default SystemSettings;