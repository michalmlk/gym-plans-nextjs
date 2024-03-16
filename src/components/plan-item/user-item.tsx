import { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { clerkClient } from '@clerk/nextjs';

export default async function UserItem({ userId }: { userId: string }): Promise<ReactElement> {

    const user = await clerkClient.users.getUser(userId);
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
            }}
        >
            <Box
                sx={{
                    borderRadius: '50%',
                    overflow: 'hidden',
                }}
            >
                <Image
                    src={user.imageUrl}
                    alt="user avatar"
                    width={40}
                    height={40}
                />
            </Box>
            <Typography variant="body1" component="p">
                {user.firstName} {user.lastName}
            </Typography>
        </Box>
    );
}