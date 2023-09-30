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

export type DiaryEntryData = {
	events:         string;                     // 今日の出来事
	insights:       string;                     // 今日の知見
	routineTasks:   Record<string, boolean>;    // 今日やったこと
}
type DiaryEntryProps = {
	setInputData: (x: DiaryEntryData) => void; 
	taskList: Array<string>;
}

export const DiaryEntry: React.FC<DiaryEntryProps> = (props: DiaryEntryProps) => {
	const [inputData, setInputData] = useState<DiaryEntryData>({
		events: 		"",
		insights: 		"",
		routineTasks: 	{},
	});
  
    const handleEntryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newData: DiaryEntryData = {...inputData, events: event.target.value};
		setInputData(newData);
		props.setInputData(newData);
    };

	const handleInsightsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newData: DiaryEntryData = {...inputData, insights: event.target.value};
		setInputData(newData);
		props.setInputData(newData);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue ={
            ...inputData.routineTasks,
            [event.target.name]: event.target.checked,
        };
        const newData: DiaryEntryData = {...inputData, routineTasks: newValue};
		setInputData(newData);
		props.setInputData(newData);
    };

	return (
		<DiaryEntryWrapper>
			<Title>日誌</Title>
            {props.taskList.map((item,index) => 
				<FormControlLabel
					control={
					<Checkbox
						checked={inputData.routineTasks[item]}
						onChange={handleCheckboxChange}
						name={item}
					/>
					}
					label={item}
				/>
			)}
			
            <TextField
                label="新しい知見"
                multiline
                rows={4}
                value={inputData.insights}
                onChange={handleInsightsChange}
                variant="outlined"
                margin="normal"
            />
			<TextField
                label="今日の出来事"
                multiline
                rows={6}
                value={inputData.events}
                onChange={handleEntryChange}
                variant="outlined"
                margin="normal"
            />
		</DiaryEntryWrapper>
	);
};
