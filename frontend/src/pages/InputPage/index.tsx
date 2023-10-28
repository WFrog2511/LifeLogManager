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
                links: [],
                notes: "",
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
            <ComponentWrapper>
                <TextField
                    label="日付"
                    type="date"
                    value={inputData.date}
                    onChange={handleDateChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
            </ComponentWrapper>

            <ComponentWrapper>  <DiaryEntry     inputData={inputData.diary}     setInputData={(val) => setInputData({...inputData, diary: val})} taskList={taskList} setTaskList={setTaskList}/>  </ComponentWrapper>
            <ComponentWrapper>  <HealthRecord   inputData={inputData.health}    setInputData={(val) => setInputData({...inputData, health: val})}/>     </ComponentWrapper>
            <ComponentWrapper>  <PetHealthEntry inputData={inputData.pet}       setInputData={(val) => setInputData({...inputData, pet: val})}/>        </ComponentWrapper>
            <ComponentWrapper>  <ArtworkUpload  inputData={inputData.artwork}   setInputData={(val) => setInputData({...inputData, artwork: val})}/>    </ComponentWrapper>
            <ComponentWrapper>  <ExpenseTracker inputData={inputData.expense}   setInputData={(val) => setInputData({...inputData, expense: val})}/>    </ComponentWrapper>
            
            <ComponentWrapper>
                <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                    登録
                </Button>
            </ComponentWrapper>
        </InputPageWrapper>
    );
};

export default InputPage;
