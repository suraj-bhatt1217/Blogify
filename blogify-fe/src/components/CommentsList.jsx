const CommentsList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="comments-section">
        <h3>Comments</h3>
        <p>No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);
      
      if (diffInSeconds < 60) return "Just now";
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
      if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
      
      return date.toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "short", 
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (error) {
      return "Just now";
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments ({comments.length})</h3>
      {comments.map((comment, index) => (
        <div className="comment" key={`${comment.postedBy}-${index}-${comment.text?.substring(0, 20)}`}>
          <div className="comment-header">
            <h4>{comment.postedBy}</h4>
            <span className="comment-date">{formatDate(comment.createdAt)}</span>
          </div>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
