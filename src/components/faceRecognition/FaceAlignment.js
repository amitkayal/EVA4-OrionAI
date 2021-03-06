import React from 'react';
import { connect } from 'react-redux';

import { submitForm } from '../../actions';
import Form from '../Form';

class FaceAlignment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      objectURL: null,
    };

    this.formName = 'facealignment';
    this.submitButtonRef = React.createRef();
  }

  onSubmit = ({ formData, objectURL }) => {
    this.props.submitForm({
      url: 'https://tq1mihfdxd.execute-api.ap-south-1.amazonaws.com/dev/align',
      formName: this.formName,
      formData,
    });

    this.setState({ objectURL: objectURL.image });
  };

  renderOutput() {
    if (this.props.modelForm.name === this.formName) {
      if (this.props.modelForm.data.result === 'success') {
        return (
          <div className="row mt-5">
            <div className="col-12 col-md-6 mt-4 ml-auto text-center">
              <div className="card mx-auto" style={{ width: '20rem' }}>
                <img
                  src={this.state.objectURL}
                  className="card-img-top"
                  alt="source"
                />
                <div className="card-body">
                  <p className="card-text">Input Image</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 mt-4 mr-auto text-center">
              <div className="card mx-auto" style={{ width: '20rem' }}>
                <img
                  src={`data:image/jpeg;base64,${this.props.modelForm.data.data}`}
                  className="card-img-top"
                  alt="aligned"
                />
                <div className="card-body">
                  <p className="card-text">Aligned Image</p>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="row mt-5">
            <div className="col-12">
              <div className="alert alert-danger">
                {this.props.modelForm.data.data}
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>
        );
      }
    }
    return '';
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h1 className="heading">Face Alignment</h1>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-11 col-lg-6 mx-auto">
            <p align="justify">
              This model uses dlib to perform face alignment tasks. Upload the
              image of a face below to run the model.
            </p>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-11 col-lg-6 mx-auto">
            <Form
              form={this.formName}
              onSubmit={this.onSubmit}
              fields={[
                {
                  name: 'image',
                  contentType: 'file',
                  label: 'Upload Face Image',
                },
              ]}
            />
          </div>
        </div>

        {this.renderOutput()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ modelForm }) => {
  return { modelForm };
};

export default connect(mapStateToProps, { submitForm })(FaceAlignment);
