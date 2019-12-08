import React, { Component } from 'react';
import moment from 'moment';
import 'moment-duration-format';
import './App.css';

moment.locale('es')

const SIZES = {
  KILOBYTE: { shortname: 'KB', factor: 0.1 },
  MEGABYTE: { shortname: 'MB', factor: 1 },
  GIGABYTE: { shortname: 'GB', factor: 1000 },
  TERABYTE: { shortname: 'TB', factor: 1000000 }
}

const DOWNLOAD_UNITS = {
  KBPS: { speed: 'Kbps', byteSize: 'KB', factor: 8000 },
  MBPS: { speed: 'Mbps', byteSize: 'MB', factor: 8 }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      result: 0,
      speed: 1,
      size: 100,
      downloadUnit: DOWNLOAD_UNITS.MBPS,
      sizeUnit: SIZES.MEGABYTE
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

  setSizeUnit(unit) {
    this.setState({ sizeUnit: unit }, () => {
      this.calculateResult()
    })
  }

  setSpeed(speed) {
    this.setState({ speed }, () => {
      this.calculateResult()
    })
  }

  calculateResult() {
    const seconds = (this.state.size * this.state.sizeUnit.factor) / (this.state.speed / this.state.downloadUnit.factor)
    const result = moment.duration(seconds, "seconds").format("d [días] h [horas] mm [minutos] ss [segundos]", { usePlural: false });

    this.setState({ result })
  }

  render() {
    return (
      <div className="container-fluid">
        <section id="calculator">
          <div className="row justify-content-md-center">
            <div className="col-12 bg-primary vh-50 text-light">
              <h1 className="display-4 mb-0" id="page-title">Calcular el tiempo de descarga ⏱</h1>
            </div>
          </div>

          <div className="row justify-content-md-center">
            <div className="col-12 bg-primary vh-50">
              <div className="container">
                <div className="row">
                  <div className="col-xl-3">
                  </div>
                  <div className="col-xl-6 col-lg-7 py-2 text-light">
                    <h4>Tamaño</h4>
                    
                    <div className="input-group input-group-lg">
                      <input
                        value={this.state.size}
                        onChange={(e) => this.setSize(e.target.value)}
                        type="number"
                        className="form-control"
                        placeholder="100"
                        aria-label="Tamaño del archivo"
                        aria-describedby="button-addon4" />
                      
                      <div className="input-group-append" id="button-addon4">
                        <button
                          onClick={() => this.setSizeUnit(SIZES.MEGABYTE)}
                          className={"btn btn-outline-secondary btn-outline-light " + (this.state.sizeUnit === SIZES.MEGABYTE ? "active" : '')}
                          type="button">MB</button>
                        <button
                          onClick={() => this.setSizeUnit(SIZES.GIGABYTE)}
                          className={"btn btn-outline-secondary btn-outline-light " + (this.state.sizeUnit === SIZES.GIGABYTE ? "active" : '')}
                          type="button">GB</button>
                        <button
                          onClick={() => this.setSizeUnit(SIZES.TERABYTE)}
                          className={"btn btn-outline-secondary btn-outline-light " + (this.state.sizeUnit === SIZES.TERABYTE ? "active" : '')}
                          type="button">TB</button>
                      </div>
                    </div>

                    <br />

                    <h4>Velocidad</h4>
                    
                    <div className="input-group input-group-lg">
                      <input
                        onChange={(e) => this.setSpeed(e.target.value)}
                        value={this.state.speed}
                        placeholder="1"
                        type="number"
                        className="form-control"
                        aria-label="Recipient's username with two button addons"
                        aria-describedby="button-addon4" />
                      
                      <div className="input-group-append" id="button-addon4">
                        <button
                          onClick={() => this.setDownloadUnit(DOWNLOAD_UNITS.KBPS)}
                          className={"btn btn-outline-secondary btn-outline-light " + (this.state.downloadUnit === DOWNLOAD_UNITS.KBPS ? "active" : '')}
                          type="button">
                          Kbps
                        </button>
                        <button
                          onClick={() => this.setDownloadUnit(DOWNLOAD_UNITS.MBPS)}
                          className={"btn btn-outline-secondary btn-outline-light " + (this.state.downloadUnit === DOWNLOAD_UNITS.MBPS ? "active" : '')}
                          type="button">
                          Mbps
                        </button>
                      </div>
                    </div>
                    <small>1 {this.state.downloadUnit.speed} equivale a 0.125 {this.state.downloadUnit.byteSize} por segundo</small>

                    <br />

                    <div id="result-group">
                      <p className='lead'>Tardaría</p>
                      <h2>{this.state.result}</h2>
                      <p className='lead'>para descargar un archivo de {this.state.size} {this.state.sizeUnit.shortname}.</p>
                    </div>
                  </div>
                  <div className="col-xl-3">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="information">
          <div className="row justify-content-md-center">
            <div className="col-12 vh-50">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12 col-lg-12">
                    <h2 className='text-center'>Calcular mi tiempo de descarga:</h2>
                    <div style={{textAlign:'right'}}><div style={{ minHeight: '360px' }}><div style={{ width: '100%', height:0, paddingBottom:'50%',position:'relative'}}><iframe style={{ border:'none',position:'absolute',top:0,left:0,width:'100%',height:'100%',minHeight:'360px',border: 'none',overflow:'hidden !important'}} src="//openspeedtest.com/Get-widget.php"></iframe></div></div>Provided by  <a href="http://openspeedtest.com">OpenSpeedtest.com</a></div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-lg-7">
                    <h2>¿Qué es TiempoDeDescarga.com?</h2>

                    <p>TiempoDeDescarga.com es una herramienta simple para calcularte cuánto tiempo podría tardar tu descarga.</p>
                  </div>

                  <div className="col-xl-6 col-lg-7">
                    <h2>Información útil</h2>

                    <p>1 Byte equivale a 8 bits.</p>

                    <table className="table table-hover">
                    <tbody>
                        <tr>
                          <th>Unidad</th>
                          <th>Cómo se lee</th>
                          <th>Otras formas de escribir</th>
                        </tr>
                        <tr>
                            <td>KBps</td>
                            <td>KiloByte por segundo</td>
                            <td>1 KB/s</td>
                        </tr>
                        <tr>
                            <td>MBps</td>
                            <td>MegaByte por segundo</td>
                            <td>1 MB/s</td>
                        </tr>
                        <tr>
                            <td>GBps</td>
                            <td>GigaByte por segundo</td>
                            <td>1 GB/s</td>
                        </tr>
                    </tbody>
                </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default App;
