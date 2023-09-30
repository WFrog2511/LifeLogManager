import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import styled from '@emotion/styled';

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

export type PetHealthEntryData = {
	notes:  string;         // ペットの様子を記述する文字列
    photos: Array<File>;    // ペットの写真のファイルリスト
}
type PetHealthEntryProps = {
	setInputData: (x: PetHealthEntryData) => void; 
}

export const PetHealthEntry: React.FC<PetHealthEntryProps> = (props: PetHealthEntryProps) => {
	const [inputData, setInputData] = useState<PetHealthEntryData>({
		notes: "",
		photos: []
	});
	
	const handlePetMemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newData: PetHealthEntryData = {...inputData, notes: event.target.value};
		setInputData(newData);
		props.setInputData(newData);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			const newData: PetHealthEntryData = {...inputData, photos: Array.from(files)};
			setInputData(newData);
			props.setInputData(newData);
		}
	};

	return (
		<PetHealthEntryWrapper>
			<Title>ペット記録</Title>
			<input
				accept="image/*"
				style={{ display: 'none' }}
				id="pet-image-file"
				type="file"
				onChange={handleFileChange}
			/>
			<label htmlFor="pet-image-file">
				<Button variant="contained" component="span">
					写真アップロード
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
		</PetHealthEntryWrapper>
	);
};
