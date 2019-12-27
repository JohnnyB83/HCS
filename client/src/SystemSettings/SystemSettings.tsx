import React, { FunctionComponent } from 'react';
import './styles/SystemSettings.css';

import Plant from '../Types/Types';

type SystemSettingsProps = {
    selectedPlants: Array<Plant>,
}

const SystemSettings: FunctionComponent<SystemSettingsProps> = ({ 
    selectedPlants,
}) => {

    const testArray = [];
    // for(let i = 0; i < selectedPlants.length; i++) {
    //     console.log(selectedPlants[i].plantName)
    //     testArray.push(selectedPlants.filter((plant) => {return plant.plantName === selectedPlants[i].plantName}));
    // }
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
                <div><input type='text' placeholder='Plant Name'></input></div>
                <div><input type='text' placeholder='Plant Date'></input></div>
                <div><input type='text' placeholder='Harvest Date'></input></div>
            </div>
            <div className='SystemSettings-plantSaveSettings'>
                <div><button>Save</button></div>
                <div><button>Cancel</button></div>
                <div><button>Reset</button></div>
            </div>
        </div>
    )

}

export default SystemSettings;