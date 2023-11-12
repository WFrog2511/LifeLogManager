package wfrog.llmanager.LifeLogManager.domain;

import jakarta.persistence.*;

import java.util.Set;
import java.time.LocalDate;
import java.util.HashSet;

// 日誌情報を記録するため
@Entity
public class DiaryEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column
    private LocalDate date;

    @Column
    private String events;

    @Column
    private String insights;

    // @OneToMany(mappedBy = "diaryEntry")
    // private Set<RoutineTaskStatus> routineTaskStatuses = new HashSet<>();

    // IDのゲッターとセッター
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Userのゲッターとセッター
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getEvents() {
        return events;
    }

    public void setEvents(String events) {
        this.events = events;
    }

    public String getInsights() {
        return insights;
    }

    public void setInsights(String insights) {
        this.insights = insights;
    }

    // public Set<RoutineTaskStatus> getRoutineTaskStatus() {
    // return routineTaskStatuses;
    // }

    // public void setRoutineTaskStatus(Set<RoutineTaskStatus> routineTaskStatuses)
    // {
    // this.routineTaskStatuses = routineTaskStatuses;
    // }

    // // Convenience methods to manage bi-directional relationship
    // public void addRoutineTaskStatus(RoutineTaskStatus routineTaskStatus) {
    // routineTaskStatuses.add(routineTaskStatus);
    // routineTaskStatus.setDiaryEntry(this);
    // }

    // public void removeRoutineTaskStatus(RoutineTaskStatus routineTaskStatus) {
    // routineTaskStatuses.remove(routineTaskStatus);
    // routineTaskStatus.setDiaryEntry(null);
    // }
}
