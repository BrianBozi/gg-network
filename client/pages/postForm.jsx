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
    fetch('/api/feed/post', {
      method: 'POST',
      body: JSON.stringify({ description: this.state.description }),
      headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    })

    // reciept of what was sent after the fetch
      .then(res => res.json())
      .then(post => {
        window.location.href = '#';
      });

  }

  render() {
    return (
      <div className="form-container">
        <h3 className="newPostHeader">New Post</h3>
      <form action="" onSubmit={this.handleSubmit}>
        <div className="fileUpload">
          <input type="file" name="image"/>
        </div>
        <textarea required name="" id="" cols="30" rows="10" onChange={this.handleChange} placeholder="write your post here"></textarea>
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
