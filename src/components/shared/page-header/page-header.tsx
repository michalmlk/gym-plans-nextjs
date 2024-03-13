import React from 'react';
import { PropsWithChildren, ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type PageHeaderProps = {
    title: string;
};
const PageHeader: React.FC<PropsWithChildren<PageHeaderProps>> = ({
                                                                      title,
                                                                      children,
                                                                  }): ReactNode => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', margin: '2.5rem 0' }}>
            <Typography variant="h2" component="h2">{title}</Typography>
            {children}
        </Box>
    );
};
export default PageHeader;
