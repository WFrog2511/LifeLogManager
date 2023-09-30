import { InputData } from "../pages/InputPage";

const submit = async(data: InputData) =>{
    try {
        const response = await fetch('http://localhost:8080/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        });
  
        if (response.ok) {
            const data = await response.json();
            console.log('Successfully submitted:', data);
            // 成功した後の処理
        } else {
            console.log('Failed to submit:', response.status);
            // エラー時の処理
        }
    } catch (error) {
        console.error('An error occurred:', error);
        // エラー時の処理
    }
};

export default submit;