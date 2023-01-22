import classes from "./comment-list.module.css";

function CommentList(props) {
  const comments = props.items;

  return (
    <ul className={classes.comments}>
      {comments.map((comment) => {
        return (
          <li key={comment._id}>
            <p>{comment.text}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>
        );
      })}
      {/* <li> */}
      {/*   <p>My comment is amazing!</p> */}
      {/*   <div> */}
      {/*     By <address>Maximilian</address> */}
      {/*   </div> */}
      {/* </li> */}
      {/* <li> */}
      {/*   <p>My comment is amazing!</p> */}
      {/*   <div> */}
      {/*     By <address>Maximilian</address> */}
      {/*   </div> */}
      {/* </li> */}
    </ul>
  );
}

export default CommentList;
