import React from 'react';

export default class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newDesc = {
      description: this.state.description
    };
    this.props.onsubmit(newDesc);
    this.setState({ description: '' });
  }

  render() {
    return (
      <div className="form-container">
        <h3 className="newPostHeader">New Post</h3>
      <form action="" >
        <textarea name="" id="" cols="30" rows="10">write your post here</textarea>
        <div>
          <div className="row">
          <div className="col-half">
          <button className="cancel"><a href="#">cancel</a></button>
          </div>
          <div className="col-half">
          <button type="submit">SUBMIT</button>
          </div>
          </div>
        </div>
      </form>
      </div>
    );
  }

}
