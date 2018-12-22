import React, { Component } from 'react';
import './App.css';
import { Table, Button, Modal, ModalBody, ModalHeader, ModalFooter, Input,
  InputGroupAddon, InputGroup } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loads: [
        { name: 'Load 1', kVA: '50', type: 'General', description: 'Pump for cooling system', wireSize: 8 },
        { name: 'Load 2', kVA: '75', type: 'HVAC', description: 'Gas Heater for store room', wireSize: 4 }
      ],
      totalLoadValue: 125,
      addValue: { name: 'Load N', kVA: '100', type: 'Awesome', description: 'Generator for explosions', wireSize: 4},
      modalIsVisible: false
    };
  }
  
  showModal = () => {
    this.setState({ modalIsVisible: true })
  }

  hideModal = () => {
    this.setState({ modalIsVisible: false })
  }

  addLoad = () => {
    const totalLoadValue = this.state.loads.map(load => parseInt(load.kVA)).reduce((total, current) => total + current)

    this.setState({ loads: [ ...this.state.loads, this.state.addValue ], modalIsVisible: false, totalLoadValue })
  }
  
  render() {
    return (
      <div className="App">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>kVA</th>
              <th>Type</th>
              <th>Description</th>
              <th>WireSize</th>
            </tr>
          </thead>
          <tbody>
            { this.state.loads.map((load, i) => 
              <tr key={i}>
                <th scope="row">{i}</th>
                <td>{load.name}</td>
                <td>{load.kVA}</td>
                <td>{load.type}</td>
                <td>{load.description}</td>
                <td>{load.wireSize}</td>
              </tr>
            )}
          </tbody>
        </Table>
        <Button color="primary" onClick={this.showModal}>{'Add Input'}</Button>
        <Modal isOpen={this.state.modalIsVisible} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add Input</ModalHeader>
          <ModalBody>
            <form id="intro-form" style={{ padding: 10 }} onSubmit={(value => console.log(value))}>
              <InputGroup>
                <InputGroupAddon addonType="prepend">{'Name'}</InputGroupAddon>
                <Input value={this.state.addValue.name} />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">{'kVA'}</InputGroupAddon>
                <Input value={this.state.addValue.kVA} />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">{'Type'}</InputGroupAddon>
                <Input value={this.state.addValue.type} />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">{'Description'}</InputGroupAddon>
                <Input value={this.state.addValue.description} />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">{'Wire Size'}</InputGroupAddon>
                <Input value={this.state.addValue.wireSize} />
              </InputGroup>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle} onClick={this.addLoad} >Add Input</Button>{' '}
            <Button color="secondary" onClick={this.hideModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Table style={{ width: '50%', marginLeft: '25%', marginTop: 20 }}>
          <thead>
            <tr>
              <th>Load Summary</th>
              <th>kVA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{'Total Connected Load'}</th>
              <td>{this.state.totalLoadValue}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
