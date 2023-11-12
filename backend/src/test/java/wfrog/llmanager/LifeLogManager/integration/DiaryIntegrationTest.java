package wfrog.llmanager.LifeLogManager.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import wfrog.llmanager.LifeLogManager.config.TestConfig;
import wfrog.llmanager.LifeLogManager.dto.DiaryDataRequest;

import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@SpringBootTest
@AutoConfigureMockMvc
@Import(TestConfig.class)
public class DiaryIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void whenPostRequestToDiaryEntry_thenCorrectResponse() throws Exception {

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

        mockMvc.perform(post("/api/diaries")
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
