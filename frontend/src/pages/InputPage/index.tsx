import React, { useState } from 'react';
import { 
    TextField, 
    Button,
} from '@mui/material';
import submit from '../../services/submit';

const InputPage: React.FC = () => {
    const [text,      setText] = useState("");
    
    const handleSubmit = async() => {
        submit(text);
    };

    return (
        <div>
            <h1>Input Page</h1>
            <TextField
                label={"今日の出来事"}
                value={text}
                onChange={(e) => setText(e.target.value)}
                multiline
                minRows={4}
  	  	    />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                登録
            </Button>
        </div>
    );
};

export default InputPage;
