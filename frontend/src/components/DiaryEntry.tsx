import React, { useState } from 'react';
import { 
	Checkbox,
	TextField, 
	FormControlLabel,
} from '@mui/material';
import styled from '@emotion/styled';

const DiaryEntryWrapper = styled.div`
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

export const DiaryEntry: React.FC = () => {
	const [entry, setEntry] = useState('');
	const [insights, setInsights] = useState('');
    const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({});
  
    const handleEntryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEntry(event.target.value);
    };

	const handleInsightsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInsights(event.target.value);
    };
    
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckboxes({
            ...checkboxes,
            [event.target.name]: event.target.checked,
        });
    };

	return (
		<DiaryEntryWrapper>
			<Title>日誌</Title>
			{/* TODO:チェックボックスの例。これをユーザーの設定に基づいて動的に生成する */}
            <FormControlLabel
                control={
                <Checkbox
                    checked={checkboxes['ゲーム'] || false}
                    onChange={handleCheckboxChange}
                    name="ゲーム"
                />
                }
                label="ゲーム"
            />
            <TextField
                label="新しい知見"
                multiline
                rows={4}
                value={insights}
                onChange={handleInsightsChange}
                variant="outlined"
                margin="normal"
            />
			<TextField
                label="今日の出来事"
                multiline
                rows={6}
                value={entry}
                onChange={handleEntryChange}
                variant="outlined"
                margin="normal"
            />
		</DiaryEntryWrapper>
	);
};
