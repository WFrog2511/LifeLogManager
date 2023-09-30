// src/components/HealthRecord.tsx
import React, { useState, useRef } from 'react';
import { TextField} from '@mui/material';
import Person from '@mui/icons-material/AccessibilityNew';
import styled from '@emotion/styled';

const HealthRecordWrapper = styled.div`
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

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    padding-top: 100%;
    margin-bottom: 20px;
`;

const Marker = styled.div`
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
    cursor: pointer;
`;

// TODO: 起床時間/就寝時間 入力欄の実装
// TODO: 睡眠時間を自動計算する機能の実装
export const HealthRecord: React.FC = () => {
    const [memo, setMemo] = useState('');
    const [markers, setMarkers] = useState<{x: number, y: number}[]>([]);
    const imageWrapperRef = useRef<HTMLDivElement | null>(null);

    const handleImageClick = (event: React.MouseEvent) => {
        const rect = imageWrapperRef.current!.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // 既に同じ位置にマーカーが存在するか確認
        const existingMarkerIndex = markers.findIndex(marker =>
            Math.abs(marker.x - x) < 10 && Math.abs(marker.y - y) < 10
        );

        if (existingMarkerIndex !== -1) {
            // 同じ位置にマーカーが存在する場合は、そのマーカーを削除
            const newMarkers = markers.slice();
            newMarkers.splice(existingMarkerIndex, 1);
            setMarkers(newMarkers);
        } else {
            // 新しいマーカーを追加
            setMarkers([...markers, {x, y}]);
        }
    };

    const handleMemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMemo(event.target.value);
    };

    return (
        <HealthRecordWrapper>
            <Title>健康記録</Title>
            <ImageWrapper ref={imageWrapperRef} onClick={handleImageClick}>
                <Person style={{ width: '100%', height:'100%', position: 'absolute', top: 0, left: 0 }} />
                {markers.map((marker, index) => (
                    <Marker
                    key={index}
                    style={{left: marker.x - 10, top: marker.y - 10}}
                    />
                ))}
            </ImageWrapper>
            <TextField
                label="メモ"
                multiline
                rows={3}
                value={memo}
                onChange={handleMemoChange}
                variant="outlined"
                margin="normal"
            />
        </HealthRecordWrapper>
    );
};
