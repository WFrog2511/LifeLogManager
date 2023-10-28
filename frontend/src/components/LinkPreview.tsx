import React, { useState, useEffect } from 'react';
import { 
	IconButton,
	Link
} from '@mui/material';
import styled from '@emotion/styled';
import { ArtworkUploadData } from './ArtworkUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const LinkPreviewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;
    padding-top: 20px;
    padding-bottom: 20px;

    position: relative;
    display: inline-block;
    margin: 5px;
`;

type LinkPreviewProps = {
    url     : string;
    index   : number;
    inputData:  ArtworkUploadData;
    setInputData: (x: ArtworkUploadData) => void; 
};

export const LinkPreview: React.FC<LinkPreviewProps> = (props: LinkPreviewProps) => {
    const [preview, setPreview] = useState<React.ReactNode | null>(null);


    useEffect(() => {
        const newUrl = props.url;
        console.log(newUrl);

        if (newUrl.includes('youtube.com')) {
            console.log(newUrl);
            

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
    }, []);

    const handleImageRemove = (index: number) => {
		const updatedLinks = props.inputData.links.filter((_, fileIndex) => fileIndex !== index);
		const newData: ArtworkUploadData = {...props.inputData, links: updatedLinks};
		props.setInputData(newData);
	};

  return (
    <LinkPreviewWrapper>

        <Link href={props.url}>{props.url}</Link>
        {preview}
        <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleImageRemove(props.index)}
        >
            <DeleteIcon />
        </IconButton>
    </LinkPreviewWrapper>
  );
};
