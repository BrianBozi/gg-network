import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstModal: true,
      description: ''
    };

    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editPost = this.editPost.bind(this);
    this.cancel = this.cancel.bind(this);
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
      .then(res => {
        this.props.getPosts();
        this.props.close();
        this.setState({ firstModal: true });

      });
  }

  cancel() {
    this.setState({ firstModal: true });
  }

  handleChange(event) {
    this.setState({ description: event.target.value });
  }

  editPost() {
    event.preventDefault();
    const id = parseInt(this.props.active.postId);
    const data = this.state.description;

    const update = { postId: id, description: data };

    fetch('/api/feed/profile/posts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    })
      .then(res => {
        this.props.getPosts();
        this.props.close();
      });
  }

  render() {
    if (!this.props.active) return null;

    if (this.state.firstModal) {
      return (
        <form action="" onSubmit={this.editPost}>
        <div className="modal" onClick={this.props.close}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="">
              <div className="col-half image-side">
                <img className="modal-photo" src={this.props.active.photo} alt="" />
              </div>
              <div className="col-half text-side">
                <textarea name="description" className="modalEditTextArea" id="description" cols="30" rows="10" defaultValue={this.props.active.description} onChange={this.handleChange}></textarea>
              </div>
            </div>
            <div>
            </div>
            <div>
              <a onClick={this.delete} className="delete">DELETE</a>
            </div>
            <div className="text-right modal-btns">
              <button type="button" className="btn btn-red" onClick={this.props.close}>Cancel</button>
              <button type="submit" className="btn btn-green" >Accept</button>
            </div>
          </div>
        </div>
        </form>
      );
    } else {
      return (
      <div className="modal" onClick={() => {
        this.props.close();
        this.cancel();

      }}>
        <div className="modal-content delete-modal" onClick={e => e.stopPropagation()}>
            <h2 className="deleteText">ARE YOU SURE YOU WANT TO DELETE</h2>
            <div className="row">
              <div className="col-half">
            <button className="btn btn-red" onClick={ this.cancel}>Cancel</button>
              </div>
              <div className="col-half">
            <button className="btn btn-green" onClick={() => { this.delePost(); this.props.close(); }}>Accept</button>
              </div>
            </div>
        </div>
      </div>);
    }
  }

}

export default Modal;
