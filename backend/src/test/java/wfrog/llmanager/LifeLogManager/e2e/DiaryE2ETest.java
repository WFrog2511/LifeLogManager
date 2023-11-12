//  エンドツーエンドのテストなので、裏でバックエンドサーバーを稼働し 
//  RestAssured.baseURIにアクセスできるようにする必要がある

package wfrog.llmanager.LifeLogManager.e2e;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import wfrog.llmanager.LifeLogManager.config.TestConfig;
import wfrog.llmanager.LifeLogManager.domain.DiaryEntry;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.Import;

import com.fasterxml.jackson.core.JsonProcessingException;

import static org.hamcrest.Matchers.equalTo;

import java.time.LocalDate;

@Import(TestConfig.class)
public class DiaryE2ETest {
    @BeforeAll
    static void setup() {
        RestAssured.baseURI = "http://localhost:8080/api";
    }

    // @Test
    // void testCreateDiaryLog() throws JsonProcessingException {
    // DiaryEntry diaryEntry = new DiaryEntry();
    // LocalDate date = LocalDate.now();
    // diaryEntry.setDate(date);

    // Response response = RestAssured.given()
    // .contentType("application/json")
    // .body(TestConfig.objectMapper().writeValueAsString(diaryEntry))
    // .when()
    // .post("/diaries")
    // .then()
    // .statusCode(201)
    // .body("date", equalTo(date.toString()))
    // .extract()
    // .response();

    // // その他のレスポンス検証...
    // }
}
