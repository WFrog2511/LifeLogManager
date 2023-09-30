import React, { useState } from 'react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

const ArtworkUploadWrapper = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 500px;
	margin: auto;
	padding: 20px;
	border: 1px solid #ddd;
	border-radius: 8px;
`;

const Title = styled.h2`
  	margin-bottom: 20px;
`;

export const ArtworkUpload: React.FC = () => {
  	const [files, setFiles] = useState<FileList | null>(null);

	const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			setFiles(files);
		}
	};

	const handleSubmit = () => {
		// 作品アップロードの送信ロジック
		if (files) {
			console.log(files);
			// ファイルをバックエンドにアップロードするロジックをここに追加
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
			<Button variant="contained" color="primary" onClick={handleSubmit} disabled={!files}>
				Submit
			</Button>
		</ArtworkUploadWrapper>
	);
};
