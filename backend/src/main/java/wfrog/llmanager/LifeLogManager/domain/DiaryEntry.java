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

    // @ElementCollection
    // @CollectionTable(name = "string_data_routine_task", joinColumns =
    // @JoinColumn(name = "string_data_id"))
    @Column(name = "routine_task", nullable = true)
    private Set<String> routineTasks = new HashSet<>();

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

    public Set<String> getRoutineTasks() {
        return routineTasks;
    }

    public void setRoutineTasks(Set<String> routineTasks) {
        this.routineTasks = routineTasks;
    }

    public void addRoutineTask(String routineTask) {
        routineTasks.add(routineTask);
    }

    public void removeRoutineTask(String routineTask) {
        routineTasks.remove(routineTask);
    }
}
