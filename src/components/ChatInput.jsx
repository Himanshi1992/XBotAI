import { TextField, Box, Button, Stack, Snackbar } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

function ChatInput({ generateResponse, setScroll, chat, clearChat }) {
  const [input, setInput] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    generateResponse(input.trim());
    setInput('');
    setScroll(prev => !prev);
  };

  const handleSave = () => {
    const chatHistory = JSON.parse(localStorage.getItem('chat')) || [];
    const date = new Date();
    const newEntry = { chat, datetime: date };
    localStorage.setItem('chat', JSON.stringify([newEntry, ...chatHistory]));
    clearChat();
    setShowSnackbar(true);
  };

  const inputStyles = {
    flex: 1,
    bgcolor: 'primary.light',
    borderRadius: 1,
    '& input': {
      fontSize: { xs: 12, md: 16 },
      px: { xs: 1, md: 2 },
    },
  };

  const buttonStyles = {
    fontSize: { xs: 12, md: 16 },
    '@media (max-width:767px)': {
      minWidth: 0,
      px: 1.5,
    },
  };

  return (
    <Box flexShrink={0} px={{ xs: 0.5, md: 3 }} pb={{ xs: 1, md: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack direction="row" spacing={{ xs: 0.5, md: 2 }}>
          <TextField
            placeholder="Message Bot AI..."
            sx={inputStyles}
            value={input}
            onChange={handleInputChange}
            required
            inputRef={inputRef}
          />
          <Button type="submit" variant="contained" sx={buttonStyles}>
            Ask
          </Button>
          <Button
            variant="outlined"
            onClick={handleSave}
            disabled={chat.length === 0}
            sx={buttonStyles}
          >
            Save
          </Button>
        </Stack>
      </Box>

      <Snackbar
        open={showSnackbar}
        message="Chat saved."
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={5000}
        action={
          <Link to="/history">
            <Button size="small">See past conversations</Button>
          </Link>
        }
      />
    </Box>
  );
}
export default ChatInput;
