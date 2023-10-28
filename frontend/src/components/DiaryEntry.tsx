import React, { useEffect } from 'react';
import { 
	Checkbox,	
	TextField, 
	FormControlLabel,
	IconButton,
} from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
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

const CheckboxContainer = styled.fieldset`
  border: 2px solid whitegray;
  border-radius: 5px;
  padding: 20px;
  margin: 10px 0;
  :hover {
	border: 2px solid black;
  }
`;

const Legend = styled.legend`
  padding: 0 10px;
`;

export type DiaryEntryData = {
	events:         string;                     // 今日の出来事
	insights:       string;                     // 今日の知見
	routineTasks:   Record<string, boolean>;    // 今日やったこと
};
type DiaryEntryProps = {
	inputData:	DiaryEntryData;
	setInputData: (x: DiaryEntryData) => void; 
	taskList: Array<string>;
	setTaskList:  (x: Array<string>) => void;
};

export const DiaryEntry: React.FC<DiaryEntryProps> = (props: DiaryEntryProps) => {

	/** やったことチェックボックスの選択肢に変更があった場合, 自動的にroutineTasksにも反映させる */
	useEffect(() => {
        const newRoutineTasks = props.taskList.reduce((acc, key) => {
			acc[key] = props.inputData.routineTasks[key] ? true : false;
			return acc;
		}, {} as Record<string, boolean>);

		const newData: DiaryEntryData = {...props.inputData, routineTasks: newRoutineTasks};
		props.setInputData(newData);
    }, [props.taskList]);

    const handleEntryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newData: DiaryEntryData = {...props.inputData, events: event.target.value};
		props.setInputData(newData);
    };

	const handleInsightsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newData: DiaryEntryData = {...props.inputData, insights: event.target.value};
		props.setInputData(newData);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue ={
            ...props.inputData.routineTasks,
            [event.target.name]: event.target.checked,
        };
        const newData: DiaryEntryData = {...props.inputData, routineTasks: newValue};
		props.setInputData(newData);
    };

	const handleAddCheckbox = () => {
		const newLabel = window.prompt('新しい選択肢を入力してください');	//TODO: 見栄えの良いモーダルに変える
		
		if (newLabel) {
			if (props.taskList.includes(newLabel)){
				console.log("既にある選択肢です");							//TODO: 見栄えの良いモーダルに変える
				return 
			}
			props.setTaskList([...props.taskList, newLabel]);
		}
	};

	return (
		<DiaryEntryWrapper>
			<Title>日誌</Title>
			<CheckboxContainer>
				<Legend>今日やったこと</Legend>
				{props.taskList.map((item,index) => 
					<FormControlLabel
						control={
							<Checkbox
								checked={props.inputData.routineTasks[item] ? true : false}
								onChange={handleCheckboxChange}
								name={item}
							/>
						}
						label={item}
						key={index}
					/>
				)}
				<IconButton edge="end" aria-label="delete" onClick={handleAddCheckbox}>
					<AddCircleOutline />
				</IconButton>
			</CheckboxContainer>
			
            <TextField
                label="新しい知見"
                multiline
                rows={4}
                value={props.inputData.insights}
                onChange={handleInsightsChange}
                variant="outlined"
                margin="normal"
            />
			<TextField
                label="今日の出来事"
                multiline
                rows={6}
                value={props.inputData.events}
                onChange={handleEntryChange}
                variant="outlined"
                margin="normal"
            />
		</DiaryEntryWrapper>
	);
};
