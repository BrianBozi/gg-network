import React from 'react';

class SearchBar extends React.Component {
// fetch to server db return userID and Gamertag with profilepic
// store in state
// handlechange on search box listening to the change in typing
// save the state of post to an const
// do a map and filter of the state
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filter: ''
    };

    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount() {
    fetch('/api/feed/search')
      .then(res => res.json())
      .then(users => this.setState({ data: users }));
  }

  handleChange(event) {
    this.setState({ filter: event.target.value });
  }

  render() {
    const { filter, data } = this.state;
    const dataSearch = data.filter(item => {
      // console.log('this is the gamer tag', item.gamerTag);
      // const notFound = [
      //   { gamerTag: 'unknown user' }
      // ];
      const id = item.userId.toString();
      if (item.gamerTag.includes(filter) || id === filter) {
        return item;
      }

      return false;
    });
    return (
    <>
  <form action="" className="searchBar">
    <input type="text" className="search" value={filter} onChange={this.handleChange}/>
  </form>
  <ul className="dropDown">
    {dataSearch.length
      ? (
          dataSearch.map(item => (
        <li key={item.userId} className="search-li" onClick={this.props.close}>
          <a href={`#profile?userId=${item.userId}`}><h3>{item.gamerTag}</h3></a>
        </li>
          ))
        )
      : (
      <li><h3>no user found</h3></li>
        )
    }
  </ul>

  </>
    );
  }
}

export default SearchBar;
