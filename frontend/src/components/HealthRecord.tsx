// src/components/HealthRecord.tsx
import React, { useRef } from 'react';
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

/** 体の異常点の座標 と 異常の情報(文字列) */
type BodyMark = { 
    x: number; 
    y: number; 
    note: string ;
};
export type HealthRecordData = {
    bodyMarks:  Array<BodyMark>;    // 体の以上点(座標) と 状態(文字列)
    mealPhotos: Array<File>;        // 食事の写真リスト
};
type HealthRecordProps = {
    inputData:  HealthRecordData;
	setInputData: (x: HealthRecordData) => void; 
};

// TODO: 起床時間/就寝時間 入力欄の実装
// TODO: 睡眠時間を自動計算する機能の実装
export const HealthRecord: React.FC<HealthRecordProps> = (props: HealthRecordProps) => {

    const imageWrapperRef = useRef<HTMLDivElement | null>(null);

    const handleImageClick = (event: React.MouseEvent) => {
        const rect = imageWrapperRef.current!.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // 既に同じ位置にマーカーが存在するか確認
        const existingMarkerIndex = props.inputData.bodyMarks.findIndex(marker =>
            Math.abs(marker.x - x) < 10 && Math.abs(marker.y - y) < 10
        );

        let newData: HealthRecordData;
        if (existingMarkerIndex !== -1) {
            // 同じ位置にマーカーが存在する場合は、そのマーカーを削除
            const newMarkers = props.inputData.bodyMarks.slice();
            newMarkers.splice(existingMarkerIndex, 1);
            newData = {...props.inputData, bodyMarks: newMarkers};
        } else {
            // 新しいマーカーを追加
            const newMarker: BodyMark = {x: x, y: y, note: ""};     // TODO: noteに文字列を入力できるようにする
            newData = {...props.inputData, bodyMarks: [...props.inputData.bodyMarks, newMarker]};
        }
        props.setInputData(newData);
    };

    return (
        <HealthRecordWrapper>
            <Title>健康記録</Title>
            <ImageWrapper ref={imageWrapperRef} onClick={handleImageClick}>
                <Person style={{ width: '100%', height:'100%', position: 'absolute', top: 0, left: 0 }} />
                {props.inputData.bodyMarks.map((marker, index) => (
                    <Marker
                    key={index}
                    style={{left: marker.x - 10, top: marker.y - 10}}
                    />
                ))}
            </ImageWrapper>
        </HealthRecordWrapper>
    );
};
