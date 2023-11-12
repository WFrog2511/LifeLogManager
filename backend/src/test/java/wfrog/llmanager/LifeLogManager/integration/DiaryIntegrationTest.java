package wfrog.llmanager.LifeLogManager.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import wfrog.llmanager.LifeLogManager.config.TestConfig;
import wfrog.llmanager.LifeLogManager.domain.DiaryEntry;

import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;

@SpringBootTest
@AutoConfigureMockMvc
@Import(TestConfig.class)
public class DiaryIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void whenPostRequestToStringDataAndValidString_thenCorrectResponse() throws Exception {
        DiaryEntry diaryEntry = new DiaryEntry();
        LocalDate date = LocalDate.now();
        diaryEntry.setDate(date);

        mockMvc.perform(post("/api/diaries")
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestConfig.objectMapper().writeValueAsString(diaryEntry)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.date").value(date.toString()));
    }
}
