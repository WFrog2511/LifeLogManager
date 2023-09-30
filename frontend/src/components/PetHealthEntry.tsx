import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import styled from '@emotion/styled';

const PetHealthEntryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const PetHealthEntry: React.FC = () => {
  const [petMemo, setPetMemo] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handlePetMemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPetMemo(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = () => {
    // ペットの健康状態エントリーの送信ロジック
    console.log(petMemo, file);
  };

  return (
    <PetHealthEntryWrapper>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="pet-image-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="pet-image-file">
        <Button variant="contained" component="span">
          Upload Pet Image
        </Button>
      </label>
      <TextField
        label="Pet Memo"
        multiline
        rows={4}
        value={petMemo}
        onChange={handlePetMemoChange}
        variant="outlined"
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </PetHealthEntryWrapper>
  );
};
