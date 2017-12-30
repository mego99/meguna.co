import React from "react";
import {Link} from "react-router-dom";
import './Work.css';
import AllPosts from './AllPosts.js';

class Art extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    document.title = 'Meguna | Art';
    fetch('/api/getnewposts')
      .then(function(response, error) {
        if (error) throw error;
        return response.json();
      }) //resolve promise by linking to next .then
      .then(parsedData => {
        console.log(parsedData);
        this.setState({posts: parsedData});
      })

  }

  adjustDate(date) {
    let monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    let t = date.split(/[- :TZ]/);
    let d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
    let dateOptions = { month:'long', day:'numeric', year:'numeric', timeZone:'Asia/Tokyo' };
    return d.toLocaleDateString('en-US', dateOptions);
  }

  getPosts() {
    let posts = this.state.posts;
    let date = this.adjustDate;
    let newarr =  Object.keys(posts).map(function(x,i) {
      return  <div key={i} className={"post-container " +i}>
                    <span className="post-tags">{posts[x].tags}</span>
                    <p>
                      <Link to={`/allposts/${posts[x].id}`} className="post-title">{posts[x].title}</Link>
                      <span className="post-date">{date(posts[x].create_time)}</span>
                    </p>
                  </div>;
    })
    return newarr;
  }

  render() {
    return (
      <div>
        <h1>Art</h1>
          <div>{this.getPosts()}</div>
      </div>
    );
  }
}

export default Art;
