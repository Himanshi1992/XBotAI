import { Box, Typography, Stack, Grid, IconButton } from "@mui/material";
import icon from "../assets/bot.png";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


function Card({ heading, subtext, handleClick }) {
    return (
        <Stack
            bgcolor={'primary.light'}
            p={{ xs: 1.2, md: 3 }}
            borderRadius={1}
            boxShadow={'0 0 12px rgba(0,0,0,0.1)'}
            direction={'row'}
            spacing={1}
            alignItems={'center'}
            justifyContent={'space-between'}
            sx={{
                '&:hover .MuiIconButton-root': {
                    opacity: 1
                },
                cursor: 'pointer',
                '&:hover' : {
                    bgcolor:'primary.bglight'
                },
                transition: 'background 200ms ease'
            }}
            onClick={() => handleClick(heading)}
        >
            <Box>
                <Typography
                    variant='heading'
                    fontWeight={700}
                    fontSize={{xs:14,md:20}}
                >
                    {heading}
                </Typography>
                <Typography
                    color={'text.secondary'}
                    fontSize={{xs:10, md:16}}
                >
                    {subtext}
                </Typography>
            </Box>
            <IconButton size='small' sx={{ opacity: 0, bgcolor: 'primary.bglight', transition: 'opacity 400ms ease' }}>
                <ArrowUpwardIcon fontSize='inherit' />
            </IconButton>
        </Stack>
    );
}

function InitialChat({ generateResponse }) {

    const initialData = [
        {
            heading: 'Hi, what is the weather',
            subtext: 'Get immediate AI generated response'
        },
        {
            heading: 'Hi, what is my location',
            subtext: 'Get immediate AI generated response'
        },
        {
            heading: 'Hi, what is the temperature',
            subtext: 'Get immediate AI generated response'
        },
        {
            heading: 'Hi, how are you',
            subtext: 'Get immediate AI generated response'
        },
    ]


    return (
        <Stack height={1} justifyContent={'flex-end'} p={{ xs: 2, md: 3 }}>
            <Stack
                alignItems={'center'}
                spacing={2}
                my={5}
            >
                <Typography variant='h2'>
                    How Can I Help You Today?
                </Typography>
                <Box
                    component={'img'}
                    src={icon}
                    height={{ xs: 42, md: 70 }}
                    width={{ xs: 42, md: 70 }}
                    boxShadow={4}
                    borderRadius={'50%'}
                />
            </Stack>
            <Grid container spacing={{ xs: 1, md: 3 }}>
                {initialData.map(item => (
                    <Grid item key={item.heading} xs={12} md={6}>
                        <Card heading={item.heading} subtext={item.subtext} handleClick={generateResponse} />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    )
}
export default InitialChat;