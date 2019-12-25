import React, { FunctionComponent } from 'react';
import './styles/PlantContainer.css';

import SelectableComponent from '../Plant/Plant';
import Plant from '../Types/Types';

type PlantContainerProps = {
    plantArray: Array<Plant>,
}

const PlantContainer: FunctionComponent<PlantContainerProps> = ({ 
    plantArray,
}) => {
    return (
        <div className='PlantContainer'>
            {plantArray.map((item, i) => (
                <SelectableComponent
                    key={i}
                    plantState={item.plantState}
                    plantName={item.plantName}
                    plantNumber={item.plantNumber}
                    plantStartDate={item.plantStartDate}
                    plantHarvestDate={item.plantHarvestDate}
                />
            ))}
        </div>
    )

}

export default PlantContainer;