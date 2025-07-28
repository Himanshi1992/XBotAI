import { Box, Select, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Filter({allChats, filterChats}){
    const [option, setOption] = useState("All Ratings")
    const handleChange = (e) => {
        setOption(e.target.value)
    }
    useEffect(() => {
        const filteredChats =
        option === 'All Ratings'
        ? allChats
        : allChats.filter(item =>
        item.chat.some(ch => ch.rating === option)
        );
    filterChats(filteredChats);
}, [option, allChats]);

return (
        <Box
            mb={3}
        >
            <Typography fontSize={12} mb={0.5}>
                Filter by rating
            </Typography>
            <Select
                value={option}
                onChange={handleChange}
                size='small'
                sx={{
                    minWidth: { xs: 1, md: 160 },
                }}
            >
                <MenuItem value='All Ratings'>All Ratings</MenuItem>
                <MenuItem value={1}>1 Star</MenuItem>
                <MenuItem value={2}>2 Stars</MenuItem>
                <MenuItem value={3}>3 Stars</MenuItem>
                <MenuItem value={4}>4 Stars</MenuItem>
                <MenuItem value={5}>5 Stars</MenuItem>
            </Select>
        </Box>
    );
}
export default Filter;
