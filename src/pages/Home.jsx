import React from 'react';
import withAuth from '../hocs/withAuth';
import axios from 'axios';

class Home extends React.Component {
  state = {
    books: [],
  };

  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>{this.props.token}</p>
        <ul>
          {this.state.books.map((book) => (
            <li>{book}</li>
          ))}
        </ul>
      </div>
    );
  }

  async componentDidMount() {
    // 책 가져오기
    try {
      const response = await axios.get('https://api.marktube.tv/v1/book', {
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    // this.setState({ books: ['hello', 'world'] });
  }
}

export default withAuth(Home);
