import React, { Component } from 'react';
import './App.css';

import SystemStatus from './SystemStatus/SystemStatus';
import PlantContainer from './PlantContainer/PlantContainer';
import { SelectableGroup } from 'react-selectable-fast';
import SystemSettings from './SystemSettings/SystemSettings';
import moment from 'moment';

import Plant from './Types/Types';
import { parse } from '@babel/core';

type AppState = {
  plantArray: Array<Plant>,
  selectedPlants: Array<Plant>,
  timeToTurnSystemOn: string,
  timeToTurnSystemOff: string,
  selectedLightCycle: string,
  reservoirMaxCapacity: string,
  reservoirRefillCadence: Date,
  reservoirCleanCadence: Date,
  nutrientsRefillCadene: Date,
  nutrientsRefillAmount: string,
  nutrientName: string,
  currentTime: string,
}

type AppProps = {

}

class App extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);

    this.state = {
      plantArray: [],
      selectedPlants: [],
      timeToTurnSystemOn: "",
      timeToTurnSystemOff: "",
      selectedLightCycle: 'test',
      reservoirMaxCapacity: 'test',
      reservoirRefillCadence: new Date(),
      reservoirCleanCadence: new Date(),
      nutrientsRefillCadene: new Date(),
      nutrientsRefillAmount: 'test',
      nutrientName: 'test',
      currentTime: moment(new Date()).format('HH:mm'),
    };

    this.handleSelectionFinish = this.handleSelectionFinish.bind(this);
  }

  async componentDidMount() {
    const initialData = await fetch('/data', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    });

    const parsedData = await initialData.json();
    const {
      plantArray,
      timeToTurnSystemOn,
      timeToTurnSystemOff,
      selectedLightCycle,
      reservoirMaxCapacity,
      reservoirRefillCadence,
      reservoirCleanCadence,
      nutrientsRefillCadene,
      nutrientsRefillAmount,
      nutrientName,
    } = parsedData;

    this.setState({
      plantArray,
      timeToTurnSystemOff,
      timeToTurnSystemOn,
    });

    setInterval(() => {
      this.setState({currentTime: moment(new Date()).format('HH:mm')});
  },1000);
  }

  handleSelecting() {
  }

  handleSelectionClear() {
    
  }

  handleSelectionFinish(selectedItems: any) {
    // console.log(selectedItems[0].props.plantName);
    this.setState({ selectedPlants: selectedItems});
  }

  getSelectableGroupRef = (ref: SelectableGroup | null) => {
    ;(window as any).selectableGroup = ref
  }
  
  render() {
    return (
      <div className="App">
        <SystemStatus 
            timeToTurnSystemOn={this.state.timeToTurnSystemOn}
            timeToTurnSystemOff={this.state.timeToTurnSystemOff}
            reservoirRefillCadence={this.state.reservoirRefillCadence}
            reservoirCleanCadence={this.state.reservoirCleanCadence}
            reservoirMaxCapacity={this.state.reservoirMaxCapacity}
            nutrientsRefillCadene={this.state.nutrientsRefillCadene}
            nutrientsRefillAmount={this.state.nutrientsRefillAmount}
            currentTime={this.state.currentTime}
        />

        <SelectableGroup
          ref={this.getSelectableGroupRef}
          className="SelectableGroup-plants"
          clickClassName="Plant"
          enableDeselect={true}
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

        <SystemSettings selectedPlants={this.state.selectedPlants} />
      </div>
    );
  }
}

export default App;
