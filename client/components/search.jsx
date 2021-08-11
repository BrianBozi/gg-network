import React from 'react';

class SearchBar extends React.Component {
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
      const id = item.userId.toString();
      if (item.gamerTag.includes(filter) || id === filter) {
        return item;
      }
      return false;
    });
    return (
    <>
  <form action="" className="search-bar" >
    <input type="text" className="search" value={filter} onChange={this.handleChange}/>
  </form>
  <ul className="drop-down">
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
        <div className="search-modal" onClick={this.props.close}></div>

  </>
    );
  }
}

export default SearchBar;
