import React, { FunctionComponent } from 'react';
import './styles/Plant.css';

import { TSelectableItemProps, createSelectable } from 'react-selectable-fast';

type PlantProps = TSelectableItemProps & {
    plantState: String,
    plantName: String,
    plantNumber: Number,
    plantStartDate: Date,
    plantHarvestDate: Date,
}

const Plant: FunctionComponent<PlantProps> = ({ 
    selectableRef,
    isSelected,
    isSelecting,
    plantState,
    plantName,
    plantNumber,
    plantStartDate,
    plantHarvestDate,
}) => {
    const classNames = [
        'Plant',
        isSelecting && 'selecting',
        isSelected && 'selected'
      ].filter(Boolean).join(' ')
    return (
        <div ref={selectableRef} className={classNames}>
            <div>{plantName}</div>
        </div>
    )

}

export default createSelectable(Plant);