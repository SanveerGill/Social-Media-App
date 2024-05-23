import { Box, Divider, Typography } from "@mui/material";
import Friend from "components/Friend";

const Comments = ({ commentDetails, main }) => {
  return (
    <Box mt="0.5rem" sx={{ transform: 'scale(0.95)', ml: '1rem', mt: '1rem' }}>
      {commentDetails.map((comment, i) => (
        <Box key={`${comment.userId}-${i}`} >
          <Divider sx={{ mb: '1rem' }} />
          <Friend
            friendId={comment.userId}
            name={`${comment.firstName} ${comment.lastName}`}
            subtitle={comment.location}
            userPicturePath={comment.userPicturePath}
          />
          <Typography sx={{ color: main, m: "0.5rem 0", pt: '0.5rem' }}>
            {comment.description}
          </Typography>
        </Box>
      ))}
      <Divider sx={{ mt: '1rem' }} />
    </Box>
  );
};

export default Comments;
