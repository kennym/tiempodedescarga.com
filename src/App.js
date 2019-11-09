import React, { Component } from 'react';
import moment from 'moment';
import 'moment-duration-format';
import './App.css';

moment.locale('es')

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      result: 0,
      speed: 1,
      size: 100,
      downloadUnit: 'mbps',
      sizeUnit: 'mb'
    }
  }

  componentDidMount() {
    this.calculateResult()
  }

  setDownloadUnit(unit) {
    this.setState({ downloadUnit: unit }, () => {
      this.calculateResult()
    })
  }

  setSize(size) {
    this.setState({ size }, () => {
      this.calculateResult()
    })
  }

  calculateResult() {
    const seconds = this.state.size / (this.state.speed / 8)
    const result = moment.duration(seconds, "seconds").format("h [horas] mm [minutos] ss [segundos]", { usePlural: false });

    this.setState({ result })
  }

  render() {
    return (
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col col-sm-8">
            <h1 id="page-title">Calcular el tiempo de descarga ⬇️⏱</h1>
          </div>
        </div>

        <div class="row justify-content-md-center">
          <div class="col col-sm-4">
            <h4>Tamaño</h4>
            
            <div class="input-group">
              <input
                value={this.state.size}
                type="text"
                class="form-control"
                placeholder="100"
                aria-label="Tamaño del archivo"
                aria-describedby="button-addon4" />
              
              <div class="input-group-append" id="button-addon4">
                <button class="btn btn-outline-secondary active" type="button">MB</button>
                <button class="btn btn-outline-secondary" type="button">GB</button>
                <button class="btn btn-outline-secondary" type="button">TB</button>
              </div>
            </div>

            <br />

            <h4>Velocidad</h4>
            
            <div class="input-group">
              <input
                value={this.state.speed}
                placeholder="1"
                type="text" class="form-control"
                aria-label="Recipient's username with two button addons"
                aria-describedby="button-addon4" />
              
              <div class="input-group-append" id="button-addon4">
                <button
                  onClick={() => this.setDownloadUnit('kbps')}
                  class="btn btn-outline-secondary"
                  type="button">
                  Kbps
                </button>
                <button
                  onClick={() => this.setDownloadUnit('mbps')}
                  class="btn btn-outline-secondary active"
                  type="button">
                  Mbps
                </button>
              </div>
            </div>

            <br />

            <div id="result-group">
              <p>Tardaría</p>
              <h3>{this.state.result}</h3>
              <p>para descargar un archivo de {this.state.size} {this.state.sizeUnit}.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
