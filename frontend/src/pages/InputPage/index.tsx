import React, { useState } from 'react';
import {
    TextField, 
    Button,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import submit from '../../services/submit';
import styled from '@emotion/styled';

import { PetHealthEntry } from '../../components/PetHealthEntry';
import { ArtworkUpload } from '../../components/ArtworkUpload';
import { ExpenseTracker } from '../../components/ExpenseTracker';
import { HealthRecord } from '../../components/HealthRecord';

const DiaryEntryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
`;

const InputPage: React.FC = () => {
    const [entry, setEntry] = useState('');
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
    const [insights, setInsights] = useState('');
    const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({});
  
    const handleEntryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEntry(event.target.value);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
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

    /**登録ボタンを押した際の処理 */
    const handleSubmit = () => {
        console.log(date, entry);
        submit(entry);
    };

    return (
        <DiaryEntryWrapper>
            <TextField
                label="日付"
                type="date"
                value={date}
                onChange={handleDateChange}
                InputLabelProps={{
                shrink: true,
                }}
            />
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

            <HealthRecord/>
            <PetHealthEntry/>
            <ArtworkUpload/>
            <ExpenseTracker/>

            <TextField
                label="今日の出来事"
                multiline
                rows={6}
                value={entry}
                onChange={handleEntryChange}
                variant="outlined"
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                登録
            </Button>
        </DiaryEntryWrapper>
    );
};

export default InputPage;
