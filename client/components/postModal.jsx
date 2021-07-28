import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstModal: true
    };

    this.delete = this.delete.bind(this);
  }

  getPosts() {
    fetch('/api/feed/profile')
      .then(res => res.json())
      .then(posts => {
        this.setState({
          posts: posts,
          items: posts
        });
      });
  }

  delete() {
    this.setState({
      firstModal: false
    });
  }

  delePost() {
    const id = { postId: this.props.active.postId };
    fetch('/api/feed/profile/post', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id)
    })
      .then(res => res.json);
    // .then(post => {
    // });
  }

  render() {
    if (this.state.firstModal) {
      return (
        <div className="modal" onClick={this.props.close}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="row">
              <div className="col-half">
                <img className="modal-photo" src={this.props.active.photo} alt="" />
              </div>
              <div className="col-half">
                <h2>{this.props.active.description}</h2>

              </div>
            </div>
            <div className="">
            </div>
            <div>
              <a onClick={this.delete}>DELETE</a>
            </div>
            <div className="text-right modal-btns">
              <button className="btn btn-red" onClick={this.props.close}>Cancel</button>
              <button className="btn btn-green" onClick={this.props.accept}>Accept</button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
      <div className="modal" onClick={this.props.close}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="row">
            <p style={{ fontSize: '36px' }}>ARE YOU SURE YOU WANT TO DELETE</p>
            <button className="btn btn-red" onClick={this.props.close}>Cancel</button>
            <button className="btn btn-green" onClick={() => { this.delePost(); this.props.close(); }}>Accept</button>
          </div>
        </div>
      </div>);
    }
  }

}

export default Modal;
