import React, { useState, useEffect } from 'react';
import {
    TextField, 
    Button,
} from '@mui/material';
import styled from '@emotion/styled';

import {submit} from '../../services/submit';
import {getTaskList} from '../../services/getTaskList';

import { DiaryEntry, DiaryEntryData } from '../../components/DiaryEntry';
import { PetHealthEntry, PetHealthEntryData } from '../../components/PetHealthEntry';
import { ArtworkUpload, ArtworkUploadData } from '../../components/ArtworkUpload';
import { ExpenseTracker, ExpenseTrackerData } from '../../components/ExpenseTracker';
import { HealthRecord, HealthRecordData } from '../../components/HealthRecord';

const InputPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
`;

const ComponentWrapper = styled.div`
    padding: 20px;
`;

export type InputData = {
    date: string;       // 日付

    diary:    DiaryEntryData;       // 日誌データ
    health:   HealthRecordData;     // 健康データ
    pet:      PetHealthEntryData;   // ペットの健康データ
    artwork:  ArtworkUploadData;    // 作品記録のデータ
    expense:  ExpenseTrackerData;   // 家計簿のデータ
};

const InputPage: React.FC = () => {
    const [inputData, setInputData] = useState<InputData>(
        {
            date:   new Date().toISOString().substring(0, 10),
            diary: {
                events: "",
                insights: "",
                routineTasks: {}
            },
            health: {
                bodyMarks: [],
                mealPhotos:[],
            },
            pet: {
                notes: "",
                photos:[],
            },
            artwork: {
                files: [],
                links:  []
            },
            expense: {
                expenseItems: [],
            }
        }
    );
    const [taskList, setTaskList] = useState<Array<string>>(["ゲーム", "プログラミング", "運動", "読書"]);
        
    useEffect(() => {
        const getTaskListWrapper = async () => {
            const res = await getTaskList("userId");
            setTaskList(res.data);
        }

        getTaskListWrapper();
    },[])

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputData( {...inputData, date: event.target.value} );
    };

    /**登録ボタンを押した際の処理 */
    const handleSubmit = () => {
        console.log(inputData);
        submit(inputData);
    };

    return (
        <InputPageWrapper>
            <TextField
                label="日付"
                type="date"
                value={inputData.date}
                onChange={handleDateChange}
                InputLabelProps={{
                shrink: true,
                }}
            />

            <ComponentWrapper>  <DiaryEntry     setInputData={(val) => setInputData({...inputData, diary: val})} taskList={taskList}/>  </ComponentWrapper>
            <ComponentWrapper>  <HealthRecord   setInputData={(val) => setInputData({...inputData, health: val})}/>     </ComponentWrapper>
            <ComponentWrapper>  <PetHealthEntry setInputData={(val) => setInputData({...inputData, pet: val})}/>        </ComponentWrapper>
            <ComponentWrapper>  <ArtworkUpload  setInputData={(val) => setInputData({...inputData, artwork: val})}/>    </ComponentWrapper>
            <ComponentWrapper>  <ExpenseTracker setInputData={(val) => setInputData({...inputData, expense: val})}/>    </ComponentWrapper>
            
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                登録
            </Button>
        </InputPageWrapper>
    );
};

export default InputPage;
