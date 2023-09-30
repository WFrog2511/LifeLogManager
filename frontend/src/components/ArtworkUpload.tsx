import React, { useState } from 'react';
import { 
	Button,
	IconButton,
	TextField
} from '@mui/material';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import ModelPreview from './ModelPreview';

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

const ImagePreviewWrapper = styled.div`
	position: relative;
	display: inline-block;
	margin: 5px;
`;

const StyledCloseIcon = styled(CloseIcon)`
	width: '100%';
	height:'100%';
	font-size: 2.0rem;  
	color: #aaaaaa;
	:hover{
		color: #ff1111;
	}
`;


export type ArtworkUploadData = {
	files:	Array<File>;    // アップロードされた作品のファイルリスト
	links:  Array<string>;  // YoutubeやGitHubなどのリンクのリスト
	notes:  string;			// メモ
};
type ArtworkUploadProps = {
	setInputData: (x: ArtworkUploadData) => void; 
}

//TODO: Linkも入力できるようにする
export const ArtworkUpload: React.FC<ArtworkUploadProps> = (props: ArtworkUploadProps) => {
	const [inputData, setInputData] = useState<ArtworkUploadData>({
		files: [],
		links: [],
		notes:  ""
	});
	const [previewUrls, setPreviewUrls] = useState<string[]>([]);

	const handlePetMemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newData: ArtworkUploadData = {...inputData, notes: event.target.value};
		setInputData(newData);
		props.setInputData(newData);
	};

	const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFiles = event.target.files;
		if (newFiles && newFiles.length > 0) {
			const newFileArray = Array.from(newFiles);
			const updatedFiles = [...inputData.files, ...newFileArray];
			const updatedPreviewUrls = [
				...previewUrls,
				...newFileArray.map(file => URL.createObjectURL(file))
			];

			const newData: ArtworkUploadData = {...inputData, files: updatedFiles};
			setInputData(newData);
			props.setInputData(newData);
			setPreviewUrls(updatedPreviewUrls);

			console.log(newFiles[0]);
		}
	};

	const handleImageRemove = (index: number) => {
		const updatedFiles = inputData.files.filter((_, fileIndex) => fileIndex !== index);
		const updatedPreviewUrls = previewUrls.filter((_, urlIndex) => urlIndex !== index);

		const newData: ArtworkUploadData = {...inputData, files: updatedFiles};
		setInputData(newData);
		props.setInputData(newData);
		setPreviewUrls(updatedPreviewUrls);
	};


	return (
		<ArtworkUploadWrapper>
			<Title>作品記録</Title>
			{previewUrls.map((url, index) => (
				<ImagePreviewWrapper key={index}>
					{inputData.files[index].type.startsWith('image') ?  
						<img src={url} alt={`Preview ${index}`} style={{ width: '100%', height: 'auto' }} />
						:
						inputData.files[index].type.startsWith('video') ?
						<video controls src={url} style={{ width: '100%', height: 'auto' }} />
						:
						inputData.files[index].type === 'model/gltf-binary' ?
						<ModelPreview fileUrl={url} />
						:
						null
					}
					<IconButton
						style={{ position: 'absolute', right: 0, top: 0 }}
						size="large"
						onClick={() => handleImageRemove(index)}
					>
						<StyledCloseIcon/>
					</IconButton>
				</ImagePreviewWrapper>
			))}
			<input
				accept="image/*,video/*,.gltf,.glb,.obj"
				style={{ display: 'none' }}
				id="artwork-files"
				type="file"
				multiple
				onChange={handleFilesChange}
			/>
			<label htmlFor="artwork-files">
				<Button variant="contained" component="span" fullWidth>
					ファイル アップロード
				</Button>
			</label>
			<TextField
				label="メモ"
				multiline
				rows={4}
				value={inputData.notes}
				onChange={handlePetMemoChange}
				variant="outlined"
				margin="normal"
			/>
		</ArtworkUploadWrapper>
	);
};
