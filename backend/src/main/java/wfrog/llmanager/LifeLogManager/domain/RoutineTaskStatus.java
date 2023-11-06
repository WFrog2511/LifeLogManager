package wfrog.llmanager.LifeLogManager.domain;

import jakarta.persistence.*;

// 一つ(1ユーザーの1日分)の日誌データDairyEntry と RoutineTaskを多対多で繋ぐ中間テーブル
@Entity
public class RoutineTaskStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "diary_entry_id", nullable = false)
    private DiaryEntry diaryEntry;

    @ManyToOne
    @JoinColumn(name = "routine_task_id", nullable = false)
    private RoutineTask RoutineTask;

    @Column(nullable = false)
    private boolean isChecked;
    // getters and setters
}
