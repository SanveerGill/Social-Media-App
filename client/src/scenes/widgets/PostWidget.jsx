import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Friend from "components/Friend";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { setPost } from "state";
  
  const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  }) => {
    const navigate = useNavigate(); 
    const [isComments, setIsComments] = useState(false);
    const [commentDetails, setCommentDetails] = useState([]);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
  
    const patchLike = async () => {
      const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };
  
    useEffect(() => {
      const fetchCommentDetails = async () => {
        if (comments && comments.length > 0) {
          const commentDetailsPromises = comments.map(async (commentId) => {
            const response = await fetch(`http://localhost:3001/posts/comments/${commentId}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            return response.json();
          });
          const fetchedCommentDetails = await Promise.all(commentDetailsPromises);
          setCommentDetails(fetchedCommentDetails);
        }
      };
  
      fetchCommentDetails();
    }, [comments, token]);

    return (
      <WidgetWrapper m="2rem 0">
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <Typography color={main} sx={{ mt: "1rem", "&:hover": {cursor: "pointer" } }} onClick={() => navigate(`/post/${postId}`)}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
  
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments ? comments.length : 0}</Typography>
            </FlexBetween>
          </FlexBetween>
  
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        {isComments && commentDetails.length > 0 && (
          <Box mt="0.5rem" sx={{ transform: 'scale(0.95)', ml: '1rem', mt: '1rem' }}>
            {commentDetails.map((comment, i) => (
              <Box key={`${name}-${i}`} >
                <Divider sx={{mb: '1rem'}} />
                <Friend
                  friendId={comment.userId}
                  name={`${comment.firstName} ${comment.lastName}`}
                  subtitle={comment.location}
                  userPicturePath={comment.userPicturePath}
                />
                <Typography sx={{ color: main, m: "0.5rem 0", pt: '0.5rem'}}>
                  {comment.description}
                </Typography>
              </Box>
            ))}
            <Divider sx={{mt: '1rem'}}  />
          </Box>
        )}
      </WidgetWrapper>
    );
  };
  
  export default PostWidget;