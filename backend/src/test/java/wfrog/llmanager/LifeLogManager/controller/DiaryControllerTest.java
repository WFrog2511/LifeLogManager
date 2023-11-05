package wfrog.llmanager.LifeLogManager.controller;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import wfrog.llmanager.LifeLogManager.domain.User;
import wfrog.llmanager.LifeLogManager.repository.DiaryEntryRepository;
import wfrog.llmanager.LifeLogManager.repository.UserRepository;

import java.util.Optional;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(DiaryController.class)
@AutoConfigureRestDocs(outputDir = "target/snippets")
class DiaryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DiaryEntryRepository diaryEntryRepository;

    @MockBean
    private UserRepository userRepository;

    @Test
    void createDiaryEntry() throws Exception {
        long user_id = 1L;

        // Create a dummy user
        User user = new User();
        user.setId(user_id);
        user.setUsername("testuser");
        user.setPassword("testpassword");

        // Setup the userRepository mock to return the dummy user when findById is
        // called
        Mockito.when(userRepository.findById(user_id)).thenReturn(Optional.of(user));

        // MockMultipartFile for testing file upload
        MockMultipartFile imageFile = new MockMultipartFile("image", "image.jpg", "image/jpeg",
                "image data".getBytes());

        // Perform the POST request
        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/diaries/" + Long.toString(user_id))
                .file(imageFile)
                .param("date", "2023-10-28")
                .param("text", "Sample diary entry"))
                .andExpect(status().isOk())
                .andDo(document("create-diary-entry"));
    }
}
