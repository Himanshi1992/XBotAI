import { Box, Typography, Stack } from "@mui/material";
import { format, isToday, isYesterday, startOfDay } from "date-fns";
import ChattingPage from "./ChattingPage";

function ChatHistory({ details }) {
  const chatDate = startOfDay(new Date(details.datetime));
  const formatDate = (date) => {
    if (isToday(date)) return "Today's chats";
    if (isYesterday(date)) return "Yesterday's chats";
    return format(date, "do LLL yyyy");
  };

  return (
    <Box component="section">
      <Typography fontWeight={700} mb={2}>
        {formatDate(chatDate)}
      </Typography>

      <Stack spacing={{ xs: 2, md: 3 }}>
        {details.chat.map((item, index) => (
          <ChattingPage key={index} details={item} readOnly />
        ))}
      </Stack>
    </Box>
  );
}

export default ChatHistory;
