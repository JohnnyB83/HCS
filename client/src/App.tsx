import React, { Component } from 'react';
import './App.css';

import SystemStatus from './SystemStatus/SystemStatus';
import PlantContainer from './PlantContainer/PlantContainer';
import { SelectableGroup } from 'react-selectable-fast';

const PlantTestData = [
  {
      plantName: 'Basil',
      plantState: 'Seed',
      plantNumber: 1,
      plantStartDate: new Date(),
      plantHarvestDate: new Date(),
  },
  {
      plantName: 'Basil',
      plantState: 'Seed',
      plantNumber: 2,
      plantStartDate: new Date(),
      plantHarvestDate: new Date(),
  },
];

type Plant = {
  plantState: String,
  plantName: String,
  plantNumber: Number,
  plantStartDate: Date,
  plantHarvestDate: Date,
}

type AppState = {
  plantArray: Array<Plant>,
  timeSystemHasBeenOn: Date,
  totalTimeSystemWillBeOn: Date,
  selectedLightCycle: String,
  reservoirMaxCapacity: String,
  reservoirRefillCadence: Date,
  reservoirCleanCadence: Date,
  nutrientsRefillCadene: Date,
  nutrientsRefillAmount: String,
  nutrientName: String,
}

type AppProps = {

}

class App extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);

    this.state = {
      plantArray: PlantTestData,
      timeSystemHasBeenOn: new Date(),
      totalTimeSystemWillBeOn: new Date(),
      selectedLightCycle: 'test',
      reservoirMaxCapacity: 'test',
      reservoirRefillCadence: new Date(),
      reservoirCleanCadence: new Date(),
      nutrientsRefillCadene: new Date(),
      nutrientsRefillAmount: 'test',
      nutrientName: 'test',
    };
  }

  handleSelecting() {
  }

  handleSelectionClear() {
    
  }

  handleSelectionFinish() {
    
  }

  getSelectableGroupRef = (ref: SelectableGroup | null) => {
    ;(window as any).selectableGroup = ref
  }
  
  render() {
    return (
      <div className="App">
        <SystemStatus 
            timeSystemHasBeenOn={this.state.timeSystemHasBeenOn}
            totalTimeSystemWillBeOn={this.state.totalTimeSystemWillBeOn}
            reservoirRefillCadence={this.state.reservoirRefillCadence}
            reservoirCleanCadence={this.state.reservoirCleanCadence}
            reservoirMaxCapacity={this.state.reservoirMaxCapacity}
            nutrientsRefillCadene={this.state.nutrientsRefillCadene}
            nutrientsRefillAmount={this.state.nutrientsRefillAmount}
        />

        <SelectableGroup
          ref={this.getSelectableGroupRef}
          className="SelectableGroup-plants"
          clickClassName="SelectableGroup-plants--isSelected"
          enableDeselect
          tolerance={5}
          allowClickWithoutSelected={false}
          duringSelection={this.handleSelecting}
          onSelectionClear={this.handleSelectionClear}
          onSelectionFinish={this.handleSelectionFinish}
        >
            <PlantContainer
                  plantArray={this.state.plantArray}
            />
        </SelectableGroup>
      </div>
    );
  }
}

export default App;
