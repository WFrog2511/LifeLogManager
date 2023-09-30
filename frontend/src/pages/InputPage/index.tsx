import React, { useState } from 'react';
import {
    TextField, 
    Button,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import submit from '../../services/submit';
import styled from '@emotion/styled';

import { DiaryEntry } from '../../components/DiaryEntry';
import { PetHealthEntry } from '../../components/PetHealthEntry';
import { ArtworkUpload } from '../../components/ArtworkUpload';
import { ExpenseTracker } from '../../components/ExpenseTracker';
import { HealthRecord } from '../../components/HealthRecord';

const InputPageWrapper = styled.div`
    // box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
`;

const ComponentWrapper = styled.div`
    // box-sizing: border-box;
    padding: 20px;
`;

const InputPage: React.FC = () => {
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
    
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    /**登録ボタンを押した際の処理 */
    const handleSubmit = () => {
        // console.log(date, entry);
        // submit(entry);
    };

    return (
        <InputPageWrapper>
            <TextField
                label="日付"
                type="date"
                value={date}
                onChange={handleDateChange}
                InputLabelProps={{
                shrink: true,
                }}
            />

            <ComponentWrapper>  <DiaryEntry/>       </ComponentWrapper>
            <ComponentWrapper>  <HealthRecord/>     </ComponentWrapper>
            <ComponentWrapper>  <PetHealthEntry/>   </ComponentWrapper>
            <ComponentWrapper>  <ArtworkUpload/>    </ComponentWrapper>
            <ComponentWrapper>  <ExpenseTracker/>   </ComponentWrapper>
            
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                登録
            </Button>
        </InputPageWrapper>
    );
};

export default InputPage;
