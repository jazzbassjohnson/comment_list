// comment component
var Comment = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="comment">
          <h2 className="commentAuthor">
            {this.props.author}
          </h2>
          <span dangerouslySetInnerHTML={{__html: rawMarkup}}></span>
      </div>
    )
  }
});

// comment box component
var CommentBox = React.createClass({
  getInitialState: function(){
    return {data: []}
  },
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    // grab list of comments on current state
    var comments = this.state.data;
    // update the list
    var newComment = comments.concat([comment])
    // set the data property on the state with a new list
    this.setState({data: newComment});
    
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval)
  },
  render: function(){
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    );
  }
});
   
   
   
// comment list component
var CommentList = React.createClass({
  render: function() {
    
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
        
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
    
  }
});



// comment form component
var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    
    if(!text || !author){
      return;
    }
    
    this.props.onCommentSubmit({author: author, text: text});
    console.log({author: author, text: text})
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your Name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text"/>
        <input type="submit" value="Post" />
      </form>
    )
  }
});




// render comment box
React.render(
  <CommentBox url="comments.json" pollInterval={20000} />,
  document.getElementById('content')
);
