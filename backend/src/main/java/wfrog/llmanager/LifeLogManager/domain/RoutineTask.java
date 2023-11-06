package wfrog.llmanager.LifeLogManager.domain;

import jakarta.persistence.*;

// 日誌記録(DiaryEntry)の 今日やったこと(routineTasks)チェックボックス群の選択肢を 全て記録するため
@Entity
public class RoutineTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;
    // getters and setters
}
