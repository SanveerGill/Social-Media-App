import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import PostWidget from "scenes/widgets/PostWidget";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const token = useSelector((state) => state.token);
  const { _id: _userId } = useSelector((state) => state.user); 
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getPost = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setPost(data);
  };

  useEffect(() => {
    getPost();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!post) return null;

  const {
    _id,
    userId,
    firstName,
    lastName,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  } = post;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Box m="2rem 0" />
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PostPage;