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
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.pollInterval)
  },
  render: function(){
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
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
  render: function() {
    return (
      <div className="commentForm">
        CommentForm
      </div>
    )
  }
});




// render comment box
React.render(
  <CommentBox url="comments.json" pollInterval={2000} />,
  document.getElementById('content')
);
