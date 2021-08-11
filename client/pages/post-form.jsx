import React from 'react';

export default class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.errorPopUp = this.errorPopUp.bind(this);
  }

  handleChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  errorPopUp(event) {
    this.setState({ error: true });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch('/api/feed/post', {
      method: 'POST',
      body: data
    })
      .then(response => {
        event.target.reset();
        if (!response.ok) {
          throw new Error('Oh no, something went wrong');
          // eslint-disable-next-line no-unreachable
          this.errorPopUp();
        }
        return response.json();
      })
      .then(post => {
        window.location.href = '#';
      })
      .catch(err => console.error(err));

  }

  render() {
    return (
      <div className="form-container">
        <h3 className="new-post-header">New Post</h3>
      <form action="" onSubmit={this.handleSubmit}>
        <div className="file-upload" name="photo">
          <input type="file" name="image"/>
        </div>
          {(this.state.error) ? <h1>Oh no something went wrong! Please refresh the page..</h1> : <textarea required name="description" id="description" cols="30" rows="10" onChange={this.handleChange} placeholder="write your post here"></textarea>}
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
