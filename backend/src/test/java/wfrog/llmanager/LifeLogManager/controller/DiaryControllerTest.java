package wfrog.llmanager.LifeLogManager.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import wfrog.llmanager.LifeLogManager.config.TestConfig;
import wfrog.llmanager.LifeLogManager.domain.DiaryEntry;
import wfrog.llmanager.LifeLogManager.domain.User;
import wfrog.llmanager.LifeLogManager.dto.DiaryDataRequest;
import wfrog.llmanager.LifeLogManager.service.DiaryService;

import java.time.LocalDate;
import java.util.Set;
import java.util.HashSet;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(DiaryController.class)
@AutoConfigureRestDocs(outputDir = "target/snippets")
@Import(TestConfig.class)
class DiaryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DiaryService service;

    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        return mapper;
    }

    @Test
    void createDiaryEntry() throws Exception {

        DiaryDataRequest request = new DiaryDataRequest();
        Long userId = 1L;
        LocalDate date = LocalDate.now();
        String events = "test_events";
        String insights = "test_insights";
        Set<String> routineTasks = new HashSet<>();
        routineTasks.add("task1");
        routineTasks.add("task2");

        request.setUserId(userId);
        request.setDate(LocalDate.now());
        request.setEvents(events);
        request.setInsights(insights);
        request.setRoutineTasks(routineTasks);

        DiaryEntry diaryEntry = new DiaryEntry();
        User user = new User();
        user.setId(userId);
        diaryEntry.setUser(user);
        diaryEntry.setDate(date);
        diaryEntry.setEvents(events);
        diaryEntry.setInsights(insights);
        diaryEntry.setRoutineTasks(routineTasks);

        when(service.saveDiaryEntry(
                any(Long.class),
                any(LocalDate.class),
                any(String.class),
                any(String.class),
                any()))
                .thenReturn(diaryEntry);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/diaries")
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestConfig.objectMapper().writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.date").value(date.toString()))
                .andExpect(jsonPath("$.events").value(events.toString()))
                .andExpect(jsonPath("$.insights").value(insights.toString()))
                .andExpect(jsonPath("$.routineTasks[0]").value(routineTasks.toArray()[0]))
                .andExpect(jsonPath("$.routineTasks[1]").value(routineTasks.toArray()[1]))
                .andExpect(jsonPath("$.user.id").value(userId.toString()));
    }
}
