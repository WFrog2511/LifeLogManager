package wfrog.llmanager.LifeLogManager.domain;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @JsonIgnore
    // @ElementCollection
    // @CollectionTable(name = "string_data_routine_task", joinColumns =
    // @JoinColumn(name = "string_data_id"))
    @Column(nullable = true)
    private Set<String> routineTasks = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
