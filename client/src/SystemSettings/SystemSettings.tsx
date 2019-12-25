import React, { FunctionComponent } from 'react';
import './styles/SystemSettings.css';

import Plant from '../Types/Types';

type SystemSettingsProps = {
    plantArray: Array<Plant>,
}

const SystemSettings: FunctionComponent<SystemSettingsProps> = ({ 
    plantArray,
}) => {
    return (
        <div className='SystemSettings'>
        </div>
    )

}

export default SystemSettings;