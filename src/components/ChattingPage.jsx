import { Box, Stack, Typography, IconButton, Rating } from "@mui/material";
import { ThumbUpOffAlt as ThumbUpOff, ThumbDownOffAlt as ThumbDownOff, ThumbUpAlt as ThumbUp } from "@mui/icons-material";
import { useEffect, useState } from 'react';
import { format } from "date-fns";
import image from "../assets/bot.png";
import human from "../assets/person.png";

function ChattingPage({
  details, showFeedbackModal, updateChat, setSelectedChatId, readOnly = false}) {
  const [isRating, setIsRating] = useState(false);
  const [rating, setRating] = useState(0);
  const isAI = details.type === 'AI';
  const hasRating = isRating || details.rating > 0;

  useEffect(() => {
    if (isRating) {
      updateChat(prev =>
        prev.map(item =>
          item.id === details.id
            ? { ...item, rating: rating || 0 }
            : item
        )
      );
    }
  }, [rating]);

  const handleThumbDown = () => {
    setSelectedChatId(details.id);
    showFeedbackModal();
  };

  const handleRatingToggle = () => {
    setIsRating(prev => !prev);
  };

  return (
    <Stack
      p={{ xs: 1, md: 2 }}
      spacing={{ xs: 1, md: 3 }}
      direction="row"
      borderRadius={1}
      boxShadow="0 0 4px rgba(0,0,0,0.1)"
      bgcolor={readOnly ? 'primary.main' : 'primary.light'}
      sx={{
        '&:hover .feedback-btns': {
          visibility: 'visible',
          opacity: 1
        }
      }}
    >
      <Box
        component="img"
        src={isAI ? image : human}
        height={{ xs: 30, md: 68 }}
        width={{ xs: 30, md: 68 }}
        borderRadius="50%"
        sx={{ objectFit: 'cover' }}
        flexShrink={0}
      />
      <Box>
        <Typography fontWeight={700} fontSize={{ xs: 14, md: 16 }}>
          {isAI ? 'Soul AI' : 'You'}
        </Typography>
        <Typography fontSize={{ xs: 12, md: 16 }}>
          {details.text}
        </Typography>
        <Stack direction="row" gap={2} alignItems="center" mt={1}>
          <Typography fontSize={{ xs: 8, md: 12 }} color="text.secondary">
            {format(details.time, 'hh:mm a')}
          </Typography>
          {isAI && !readOnly && (
            <Stack
              direction="row"
              visibility={{ xs: 'visible', md: 'hidden' }}
              sx={{
                opacity: { xs: 1, md: 0 },
                transition: 'opacity 400ms ease'
              }}
              className="feedback-btns"
            >
              <IconButton size="small" onClick={handleRatingToggle}>
                {isRating ? <ThumbUp fontSize="inherit" /> : <ThumbUpOff fontSize="inherit" />}
              </IconButton>
              <IconButton size="small" onClick={handleThumbDown}>
                <ThumbDownOff fontSize="inherit" />
              </IconButton>
            </Stack>
          )}
        </Stack>
        {isAI && hasRating && (
          <Box pt={{ xs: 1, md: 2 }}>
            <Typography
              component="legend"
              fontSize={{ xs: 10, md: 12 }}
              mb={0.5}
            >
              {readOnly ? 'Rating:' : 'Rate this response:'}
            </Typography>
            <Rating
              name="simple-controlled"
              value={details.rating || rating}
              onChange={(_, newValue) => setRating(newValue)}
              readOnly={readOnly}
              sx={{ width: 'auto' }}
            />
          </Box>
        )}
        {details.feedback && (
          <Typography pt={1} fontSize={{ xs: 10, md: 16 }}>
            <Box component="span" fontWeight={600}>
              Feedback:
            </Box>{' '}
            <Box component="span">{details.feedback}</Box>
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
export default ChattingPage;