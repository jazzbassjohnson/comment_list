// comment box component
var CommentBox = React.createClass({
  render: function(){
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});
   
// comment list component
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        <Comment author="Pete Hunt">This is a comment!</Comment>
        <Comment author="Dwane Johnson">This is *another* comment!</Comment>
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

// comment component
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
          <h2 className="commentAuthor">
            {this.props.author}
          </h2>
          {this.props.children}
      </div>
    )
  }
});


// render comment box
React.render(
  <CommentBox/>,
  document.getElementById('content')
);