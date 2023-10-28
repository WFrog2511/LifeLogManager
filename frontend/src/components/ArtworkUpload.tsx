import React, { useState } from 'react';
import { 
	Button,
	IconButton,
	TextField
} from '@mui/material';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import ModelPreview from './ModelPreview';
import OBJModel from './OBJModel';
import { LinkPreview } from './LinkPreview';

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

type PreviewData = {
    url: string;
    fileType: string;
};
export type ArtworkUploadData = {
	files:	Array<File>;    // アップロードされた作品のファイルリスト
	links:  Array<string>;  // YoutubeやGitHubなどのリンクのリスト
	notes:  string;			// メモ
};
type ArtworkUploadProps = {
	inputData:  ArtworkUploadData;
	setInputData: (x: ArtworkUploadData) => void; 
};

export const ArtworkUpload: React.FC<ArtworkUploadProps> = (props: ArtworkUploadProps) => {
	const [previews, setPreviews] = useState<PreviewData[]>([]);

	const handleMemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newData: ArtworkUploadData = {...props.inputData, notes: event.target.value};
		props.setInputData(newData);
	};

	const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFiles = event.target.files;
		if (newFiles && newFiles.length > 0) {
			const newFileArray = Array.from(newFiles);
			const updatedFiles = [...props.inputData.files, ...newFileArray];
			const updatedPreviews = [
				...previews,
				...newFileArray.map(file => ({
					url: URL.createObjectURL(file),
					fileType: file.name.split('.').length > 0 ? file.name.split('.').slice(-1)[0].toLowerCase() : "" // ファイル拡張子を取得
				}))
			];

			const newData: ArtworkUploadData = {...props.inputData, files: updatedFiles};
			props.setInputData(newData);
			setPreviews(updatedPreviews);

			console.log(newFiles[0]);
		}
	};

	const handleImageRemove = (index: number) => {
		const updatedFiles = props.inputData.files.filter((_, fileIndex) => fileIndex !== index);
		const updatedPreviews = previews.filter((_, previewIndex) => previewIndex !== index);

		const newData: ArtworkUploadData = {...props.inputData, files: updatedFiles};
		props.setInputData(newData);
		setPreviews(updatedPreviews);
	};


	const handleAddLink = () => {
		const newUrl = window.prompt('URLを追加してください');	//TODO: 見栄えの良いモーダルに変える
		
		if (newUrl) {
			const updatedLinks = [...props.inputData.links, newUrl];
			const newData: ArtworkUploadData = {...props.inputData, links: updatedLinks};
			props.setInputData(newData);
		}
	};


	return (
		<ArtworkUploadWrapper>
			<Title>作品記録</Title>

			<label htmlFor="artwork-files">
				<Button variant="contained" component="span" fullWidth>
					ファイル アップロード
				</Button>
			</label>

			{previews.map((item, index) => (
				<ImagePreviewWrapper key={index}>
					{props.inputData.files[index].type.startsWith('image') ?  
						<img src={item.url} alt={`Preview ${index}`} style={{ width: '100%', height: 'auto' }} />
						:
						props.inputData.files[index].type.startsWith('video') ?
						<video controls src={item.url} style={{ width: '100%', height: 'auto' }} />
						:
						item.fileType === 'obj' ?
						<OBJModel url={item.url} />
						:
						item.fileType === 'gltf' || item.fileType === 'glb' ?
						<ModelPreview fileUrl={item.url} />
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

			<Button variant="contained" color="primary" onClick={handleAddLink}>
                URL追加
            </Button>
			
			{props.inputData.links.map((item, index) => (
				<LinkPreview url={item} index={index} inputData={props.inputData} setInputData={props.setInputData}/>
			))}
			
			<TextField
				label="メモ"
				multiline
				rows={4}
				value={props.inputData.notes}
				onChange={handleMemoChange}
				variant="outlined"
				margin="normal"
			/>
		</ArtworkUploadWrapper>
	);
};
