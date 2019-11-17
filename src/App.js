import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.css';
import Autocomplete from './autocomplete'
class App extends Component {
  percentage;
  newData;
  nameData;
  constructor(props) {
    super(props);

    this.state = { selectedFile: null, loaded: 0, image: '' }

  }

  getData() {

  }

  handleselectedFile(e) {
    console.log('clicked')

    this.setState({
      loaded: 0,
    })

  }

  handleUpload() {
    console.log('clicked')
    const apiUrl = "http://localhost:3000/upload";
    var formData = new FormData();
    var imagefile = document.querySelector('#uploadField');
    formData.append("avatar", imagefile.files[0]);
    console.log(imagefile.files[0], formData);
    axios.post(apiUrl, formData, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
        })
      }
    }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res);

      });
  };
  render() {
    return (
      <div className="App">
        <br />
        <div className="container-fluid">

          <div className="row">
            <div className="col-xs-12 col-md-8 mx-auto">
              <h2 className="text-center">Pipedrive test</h2>

              <form id="uploadForm" encType="multipart/form-data" action="upload_file" >
                <div className="form-group">
                  <h4 className="float-left">Upload your file:</h4>
                  <br />
                  <br />
                  <input type="file" className="form-control-file" id="uploadField" name="avatar" onChange={(e) => this.handleselectedFile(e)} />
                  <br />
                  <Button className="float-left" id="uploadButton" onClick={this.handleUpload.bind(this)} variant="contained" color="primary" >Submit</Button>
                  <div> Progress:{Math.round(this.state.loaded, 2)} %</div>
                </div>
              </form>
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-xs-12 col-md-8 mx-auto">
              <Autocomplete />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
