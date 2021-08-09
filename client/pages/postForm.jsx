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
    const data = new FormData(event.target);

    fetch('/api/feed/post', {
      method: 'POST',
      body: data
    })
      .then(result => {
        event.target.reset();
      })
      .then(post => {
        window.location.href = '#';
      })
      .catch(err => console.error(err));

  }

  render() {
    return (
      <div className="form-container">
        <h3 className="newPostHeader">New Post</h3>
      <form action="" onSubmit={this.handleSubmit}>
        <div className="fileUpload" name="photo">
          <input type="file" name="image"/>
        </div>
          <textarea required name="description" id="description" cols="30" rows="10" onChange={this.handleChange} placeholder="write your post here"></textarea>
        <div>
          <div className="row">
          <div className="col-half">
          <a className="cancel" href="#">CANCEL</a>
          </div>
          <div className="col-half">
          <button type="submit" className="submit">SUBMIT</button>
          </div>
          </div>
        </div>
      </form>
      </div>
    );
  }

}
