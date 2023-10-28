package wfrog.llmanager.LifeLogManager;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest
public class ApiDocumentationJUnit5Test {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void createDiaryEntry() throws Exception {
        this.mockMvc.perform(post("/api/diaries/{userId}", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"date\":\"2023-10-29\",\"text\":\"Sample text\",\"image\":\"Sample image\"}"))
                .andExpect(status().isOk())
                .andDo(document("create-diary-entry"));
    }
}