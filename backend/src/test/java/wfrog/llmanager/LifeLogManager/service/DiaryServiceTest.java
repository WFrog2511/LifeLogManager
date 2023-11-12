package wfrog.llmanager.LifeLogManager.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import wfrog.llmanager.LifeLogManager.domain.DiaryEntry;
import wfrog.llmanager.LifeLogManager.repository.DiaryEntryRepository;

public class DiaryServiceTest {
    @Mock
    private DiaryEntryRepository repository;

    @InjectMocks
    private DiaryService service;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void whenCreateDiaryEntry_thenDiaryEntryShouldBeReturned() {

        DiaryEntry diaryEntry = new DiaryEntry();
        LocalDate date = LocalDate.now();
        diaryEntry.setDate(date);

        String events = "test_events";
        diaryEntry.setEvents(events);

        String insights = "test_insights";
        diaryEntry.setInsights(insights);

        when(repository.save(any(DiaryEntry.class))).thenReturn(diaryEntry);

        DiaryEntry created = service.saveDailyLog(diaryEntry);

        assertThat(created.getDate()).isEqualTo(date);
    }
}
