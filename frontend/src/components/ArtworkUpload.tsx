import React, { useState } from 'react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

const ArtworkUploadWrapper = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	width: 100%;
	margin: auto;
	padding: 20px;
	border: 1px solid #ddd;
	border-radius: 8px;
`;

const Title = styled.h2`
  	margin-bottom: 20px;
`;

export type ArtworkUploadData = {
	files:	Array<File>;    // アップロードされた作品のファイルリスト
	links:  Array<string>;  // YoutubeやGitHubなどのリンクのリスト
};
type ArtworkUploadProps = {
	setInputData: (x: ArtworkUploadData) => void; 
}

//TODO: Linkも入力できるようにする
export const ArtworkUpload: React.FC<ArtworkUploadProps> = (props: ArtworkUploadProps) => {
	const [inputData, setInputData] = useState<ArtworkUploadData>({
		files: [],
		links: []
	});

	const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			const newData: ArtworkUploadData = {...inputData, files: Array.from(files)};
			setInputData(newData);
			props.setInputData(newData);
		}
	};

	return (
		<ArtworkUploadWrapper>
			<Title>作品記録</Title>
			<input
				accept="image/*,video/*,model/*"
				style={{ display: 'none' }}
				id="artwork-files"
				type="file"
				multiple
				onChange={handleFilesChange}
			/>
			<label htmlFor="artwork-files">
				<Button variant="contained" component="span">
					Upload Artwork Files
				</Button>
			</label>
		</ArtworkUploadWrapper>
	);
};
