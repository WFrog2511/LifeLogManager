package wfrog.llmanager.LifeLogManager.domain;

import jakarta.persistence.*;

// RoutineTask と User を多対多で繋ぐための中間テーブル
@Entity
public class UserRoutineTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "checkbox_option_id", nullable = false)
    private RoutineTask routineTask;
    // getters and setters
}
