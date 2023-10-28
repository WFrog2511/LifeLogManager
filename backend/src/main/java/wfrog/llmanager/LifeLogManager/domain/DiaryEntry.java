package wfrog.llmanager.LifeLogManager.domain;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class DiaryEntry {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column
    private Date date;

    @Column(columnDefinition = "TEXT")
    private String text;

    @Lob
    private byte[] image;

    public void setUser(User user) {
        this.user = user;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
