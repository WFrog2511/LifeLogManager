package wfrog.llmanager.LifeLogManager.domain;

import jakarta.persistence.*;

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

    // @OneToMany(mappedBy = "user")
    // private Set<UserRoutineTask> UserRoutineTaskCheckboxOptions;

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

    // public Set<UserRoutineTask> getUserRoutineTaskCheckboxOptions() {
    // return UserRoutineTaskCheckboxOptions;
    // }

    // public void setUserRoutineTaskCheckboxOptions(Set<UserRoutineTask>
    // userRoutineTaskCheckboxOptions) {
    // UserRoutineTaskCheckboxOptions = userRoutineTaskCheckboxOptions;
    // }

}
