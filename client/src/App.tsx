import React, { Component } from 'react';
import './App.css';

import SystemStatus from './SystemStatus/SystemStatus';

type AppState = {
  selectedPlants: Array<Object>,
  timeSystemHasBeenOn: Date,
  totalTimeSystemWillBeOn: Date,
  selectedLightCycle: String,
  reservoirMaxCapacity: String,
  reservoirRefillCadence: Date,
  reservoirCleanCadence: Date,
  nutrientsRefillCadene: Date,
  nutrientsRefillAmount: String,
  nutrientName: String,
  plantState: String,
  plantName: String,
  plantStartDate: Date,
  plantHarvestDate: Date,
}

type AppProps = {

}

class App extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);

    this.state = {
      selectedPlants: [],
      timeSystemHasBeenOn: new Date(),
      totalTimeSystemWillBeOn: new Date(),
      selectedLightCycle: 'test',
      reservoirMaxCapacity: 'test',
      reservoirRefillCadence: new Date(),
      reservoirCleanCadence: new Date(),
      nutrientsRefillCadene: new Date(),
      nutrientsRefillAmount: 'test',
      nutrientName: 'test',
      plantState: 'test',
      plantName: 'test',
      plantStartDate: new Date(),
      plantHarvestDate: new Date(),
    };
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
      </div>
    );
  }
}

export default App;
