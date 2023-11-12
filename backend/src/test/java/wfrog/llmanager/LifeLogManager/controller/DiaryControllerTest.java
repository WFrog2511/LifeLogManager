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
import wfrog.llmanager.LifeLogManager.domain.RoutineTask;
import wfrog.llmanager.LifeLogManager.domain.RoutineTaskStatus;
import wfrog.llmanager.LifeLogManager.domain.User;
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
        // テスト用のユーザーID、通常はデータベースから取得するか、テスト用に作成する
        // User testUser = new User();
        // testUser.setId(1L); // テスト用のID

        // // テスト用のチェックボックスオプション、実際にはデータベースから取得するか、テスト用に作成する
        // RoutineTask option1 = new RoutineTask();
        // option1.setId(1L); // テスト用のID
        // RoutineTask option2 = new RoutineTask();
        // option2.setId(2L); // テスト用のID

        // // テスト用のDailyCheckboxStatusを設定
        // RoutineTaskStatus status1 = new RoutineTaskStatus();
        // status1.setRoutineTask(option1);
        // status1.setChecked(true);

        // RoutineTaskStatus status2 = new RoutineTaskStatus();
        // status2.setRoutineTask(option2);
        // status2.setChecked(false);

        // DailyLogオブジェクトにデータをセットアップ
        DiaryEntry diaryEntry = new DiaryEntry();
        // diaryEntry.setUser(testUser);
        LocalDate date = LocalDate.now();
        diaryEntry.setDate(LocalDate.now());

        String events = "test_events";
        diaryEntry.setEvents(events);

        String insights = "test_insights";
        diaryEntry.setInsights(insights);

        // Set<RoutineTaskStatus> statuses = new HashSet<>();
        // statuses.add(status1);
        // statuses.add(status2);
        // diaryEntry.setRoutineTaskStatus(statuses);

        when(service.saveDailyLog(any(DiaryEntry.class))).thenReturn(diaryEntry);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/diaries")
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestConfig.objectMapper().writeValueAsString(diaryEntry)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.date").value(date.toString()))
                .andExpect(jsonPath("$.events").value(events.toString()))
                .andExpect(jsonPath("$.insights").value(insights.toString()));
    }
}
