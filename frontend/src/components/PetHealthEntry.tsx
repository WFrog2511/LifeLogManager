import React, { useState } from 'react';
import { 
	Button,
	IconButton,
	TextField, 
} from '@mui/material';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';

const PetHealthEntryWrapper = styled.div`
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

export type PetHealthEntryData = {
	notes:  string;         // ペットの様子を記述する文字列
    photos: Array<File>;    // ペットの写真のファイルリスト
}
type PetHealthEntryProps = {
	inputData: PetHealthEntryData;
	setInputData: (x: PetHealthEntryData) => void; 
}

export const PetHealthEntry: React.FC<PetHealthEntryProps> = (props: PetHealthEntryProps) => {

	const [previewUrls, setPreviewUrls] = useState<string[]>([]);
	
	const handlePetMemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newData: PetHealthEntryData = {...props.inputData, notes: event.target.value};
		props.setInputData(newData);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFiles = event.target.files;
		if (newFiles && newFiles.length > 0) {
			const newFileArray = Array.from(newFiles);
			const updatedFiles = [...props.inputData.photos, ...newFileArray];
			const updatedPreviewUrls = [
				...previewUrls,
				...newFileArray.map(file => URL.createObjectURL(file))
			];

			const newData: PetHealthEntryData = {...props.inputData, photos: updatedFiles};
			props.setInputData(newData);
      		setPreviewUrls(updatedPreviewUrls);
		}
	};

	const handleImageRemove = (index: number) => {
		const updatedFiles = props.inputData.photos.filter((_, fileIndex) => fileIndex !== index);
		const updatedPreviewUrls = previewUrls.filter((_, urlIndex) => urlIndex !== index);

		const newData: PetHealthEntryData = {...props.inputData, photos: updatedFiles};
		props.setInputData(newData);
		setPreviewUrls(updatedPreviewUrls);
	};

	return (
		<PetHealthEntryWrapper>
			<Title>ペット記録</Title>
			{previewUrls.map((url, index) => (
				<ImagePreviewWrapper key={index}>
					<img src={url} alt={`Pet Preview ${index}`} style={{ width: '100%', height: 'auto' }} />
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
				accept="image/*"
				style={{ display: 'none' }}
				id="pet-image-file"
				type="file"
				multiple
				onChange={handleFileChange}
			/>
			<label htmlFor="pet-image-file">
				<Button variant="contained" component="span" fullWidth>
					写真 アップロード
				</Button>
			</label>
			<TextField
				label="メモ"
				multiline
				rows={4}
				value={props.inputData.notes}
				onChange={handlePetMemoChange}
				variant="outlined"
				margin="normal"
			/>
		</PetHealthEntryWrapper>
	);
};
