package wfrog.llmanager.LifeLogManager.dto;

import java.time.LocalDate;
import java.util.Set;

public class DiaryDataRequest {
    private String events;
    private String insights;
    private Long userId;
    private LocalDate date;
    private Set<String> routineTasks;

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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<String> getRoutineTasks() {
        return routineTasks;
    }

    public void setRoutineTasks(Set<String> routineTasks) {
        this.routineTasks = routineTasks;
    }

}
