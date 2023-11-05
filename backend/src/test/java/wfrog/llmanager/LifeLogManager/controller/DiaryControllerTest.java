package wfrog.llmanager.LifeLogManager.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import wfrog.llmanager.LifeLogManager.repository.DiaryEntryRepository;
import wfrog.llmanager.LifeLogManager.repository.UserRepository;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class DiaryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DiaryEntryRepository diaryEntryRepository;

    @MockBean
    private UserRepository userRepository;

    @Test
    void createDiaryEntry() throws Exception {
        MockMultipartFile imageFile = new MockMultipartFile(
                "image", "image.jpg", "image/jpeg", "image data".getBytes());
        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/diaries/1")
                .file(imageFile)
                .param("date", "2023-10-28")
                .param("text", "Sample diary entry"))
                .andExpect(status().isOk());
        // .andDo(document("create-diary-entry"));
    }
}
