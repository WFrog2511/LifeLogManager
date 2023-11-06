package wfrog.llmanager.LifeLogManager.domain;

import jakarta.persistence.*;

import java.util.Set;
import java.util.Date;

// 日誌情報を記録するため
@Entity
public class DiaryEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column
    private Date date;

    @Column
    private String events;

    @Column
    private String insights;

    @OneToMany(mappedBy = "diaryEntry")
    private Set<RoutineTaskStatus> routineTaskStatus;

    public void setUser(User user) {
        this.user = user;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setEvents(String events) {
        this.events = events;
    }

    public void setInsights(String insights) {
        this.insights = insights;
    }

}
