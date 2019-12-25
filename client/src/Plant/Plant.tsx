import React, { FunctionComponent } from 'react';
import './styles/Plant.css';

import { TSelectableItemProps, createSelectable } from 'react-selectable-fast';
const classNames = require('classnames');

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
    const classNamesForComponent = classNames('Plant', {
        'selecting': isSelecting,
        'selected': isSelected,
        'notPlanted': plantName === '',
    })
    return (
        <div ref={selectableRef} className={classNamesForComponent}>
            <div>{plantNumber}</div>
        </div>
    )

}

export default createSelectable(Plant);