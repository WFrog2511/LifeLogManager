/** 日誌の今日あった事の ユーザーごとの選択肢 を取得する処理 */
export const getTaskList = async(userId: string) =>{
    return {data: ["ゲーム", "散歩", "読書", "買い物", "勉強"]};
    
    //TODO: サーバー側を対応させる
    try {
        const response = await fetch('http://localhost:8080/api/tasklist', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ userId }),
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