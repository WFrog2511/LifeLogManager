package wfrog.llmanager.LifeLogManager.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import wfrog.llmanager.LifeLogManager.domain.DiaryEntry;
import wfrog.llmanager.LifeLogManager.domain.User;
import wfrog.llmanager.LifeLogManager.repository.DiaryEntryRepository;
import wfrog.llmanager.LifeLogManager.repository.UserRepository;

public class DiaryServiceTest {
    @Mock
    private DiaryEntryRepository diaryEntryRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private DiaryService service;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void whenCreateDiaryEntry_thenDiaryEntryShouldBeReturned() {

        DiaryEntry diaryEntry = new DiaryEntry();
        Long userId = 1L;
        LocalDate date = LocalDate.now();
        String events = "test_events";
        String insights = "test_insights";
        Set<String> routineTasks = new HashSet<>();
        routineTasks.add("task1");
        routineTasks.add("task2");

        diaryEntry.setDate(date);
        diaryEntry.setEvents(events);
        diaryEntry.setInsights(insights);
        diaryEntry.setRoutineTasks(routineTasks);

        User user = new User();
        user.setId(userId);

        when(userRepository.findById(any(Long.class))).thenReturn(Optional.of(user));
        when(diaryEntryRepository.save(any(DiaryEntry.class))).thenReturn(diaryEntry);

        DiaryEntry created = service.saveDiaryEntry(
                userId,
                date,
                events,
                insights,
                routineTasks);

        assertThat(created.getDate()).isEqualTo(date);
    }
}
