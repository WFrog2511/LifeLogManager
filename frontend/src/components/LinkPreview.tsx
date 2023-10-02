// src/components/LinkPreview.tsx
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import styled from '@emotion/styled';

const LinkPreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const LinkPreview: React.FC = () => {
    const [url, setUrl] = useState('');
    const [preview, setPreview] = useState<React.ReactNode | null>(null);

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = event.target.value;
        setUrl(newUrl);

        if (newUrl.includes('youtube.com')) {
            const videoId = newUrl.split('v=')[1];
            setPreview(
                <iframe
                width="100%"
                height="250px"    // 💩アスペクト比を固定したかったが, aspect-ratioが効かなかったため
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ></iframe>
            );
        } else {
            setPreview(null);
        }
    };

  return (
    <LinkPreviewWrapper>
        <TextField
            label="URL"
            value={url}
            onChange={handleUrlChange}
            variant="outlined"
            fullWidth
            margin="normal"
        />
        <div>
            {preview}
        </div>
    </LinkPreviewWrapper>
  );
};
