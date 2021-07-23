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

    // reciept of what was sent
      .then(res => res.json());
    // .then(post => console.log('post:'.post));
    // const newDesc = {
    //   description: this.state.description
    // };
    // this.props.onSubmit(newDesc);
    // this.setState({ description: '' });
  }

  render() {
    // console.log(this.state);
    return (
      <div className="form-container">
        <h3 className="newPostHeader">New Post</h3>
      <form action="" onSubmit={this.handleSubmit}>
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
