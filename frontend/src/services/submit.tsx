
const submit = async(text: string) =>{
    try {
        const response = await fetch('https://your-api-endpoint.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
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