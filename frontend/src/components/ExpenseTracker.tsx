import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from '@emotion/styled';

const ExpenseTrackerWrapper = styled.div`
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

type IncomeOrExpense = 'income' | 'expense';
type ExpenseItem = {
    description: string;
    amount: number;
    type: IncomeOrExpense;
};
export type ExpenseTrackerData = {
    expenseItems: Array<ExpenseItem>,
};

type ExpenseTrackerProps = {
    inputData:  ExpenseTrackerData;
    setInputData: (x: ExpenseTrackerData) => void
};

export const ExpenseTracker: React.FC<ExpenseTrackerProps> = (props: ExpenseTrackerProps) => {
    
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<IncomeOrExpense>('expense');

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value as IncomeOrExpense);
    };

    const handleAddItem = () => {
        if (description && amount) {
            const newItem: ExpenseItem = { description, amount: parseFloat(amount), type };
            const newData: ExpenseTrackerData = {...props.inputData, expenseItems: [...props.inputData.expenseItems, newItem]};
            props.setInputData(newData);
            
            setDescription('');
            setAmount('');
        }
    };

    const handleDeleteItem = (index: number) => {
        const newItems = [...props.inputData.expenseItems];
        newItems.splice(index, 1);
        const newData = {...props.inputData, expenseItems: newItems}
        props.setInputData(newData);
    };

    return (
        <ExpenseTrackerWrapper>
            <Title>家計簿</Title>
            <TextField
                label="概要"
                value={description}
                onChange={handleDescriptionChange}
                margin="normal"
                fullWidth
            />
            <TextField
                label="金額"
                value={amount}
                onChange={handleAmountChange}
                margin="normal"
                fullWidth
            />
            <TextField
                label=""
                select
                value={type}
                onChange={handleTypeChange}
                SelectProps={{
                native: true,
                }}
                margin="normal"
                fullWidth
            >
                <option value="expense">支出</option>
                <option value="income">収入</option>
            </TextField>
            <Button variant="contained" color="primary" onClick={handleAddItem}>
                追加
            </Button>
            <List>
                {props.inputData.expenseItems.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={item.description}
                            secondary={`${item.type === 'income' ? '+' : '-'}￥${item.amount}`}
                        />
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </ExpenseTrackerWrapper>
    );
};
