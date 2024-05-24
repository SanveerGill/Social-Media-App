import { useState } from "react";
import { Box, Divider, Typography, Modal, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Friend from "components/Friend";

const Comments = ({ commentDetails, main }) => {
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleImageExpansion = (image) => {
    setIsImageExpanded(!isImageExpanded);
    setSelectedImage(image);
  };

  const closeModal = () => {
    setIsImageExpanded(false);
    setSelectedImage(null);
  };

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
          {comment.picturePath && (
            <>
              <img
                width="100%"
                height="auto"
                alt="post"
                style={{
                  maxWidth: isImageExpanded ? "100%" : "25%",
                  maxHeight: isImageExpanded ? "auto" : "25%",
                  borderRadius: "0.75rem",
                  marginTop: "0.75rem",
                  cursor: "pointer"
                }}
                src={`http://localhost:3001/assets/${comment.picturePath}`}
                onClick={() => toggleImageExpansion(comment.picturePath)}
              />
              <Modal
                open={isImageExpanded}
                onClose={closeModal}
                aria-labelledby="image-modal"
                aria-describedby="modal-to-display-image"
              >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <img
                    src={`http://localhost:3001/assets/${selectedImage}`}
                    alt="expanded-post"
                    style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: "0.75rem" }}
                  />
                  <IconButton onClick={closeModal} sx={{ position: 'absolute', top: 0, right: 0 }}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Modal>
            </>
          )}
        </Box>
      ))}
      <Divider sx={{ mt: '1rem' }} />
    </Box>
  );
};

export default Comments;