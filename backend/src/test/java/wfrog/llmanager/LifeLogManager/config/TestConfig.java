package wfrog.llmanager.LifeLogManager.config;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;

@TestConfiguration
public class TestConfig {
    @Bean
    static public ObjectMapper objectMapper() {
        JavaTimeModule module = new JavaTimeModule();

        // LocalDateのシリアライズ方式をISOフォーマットに設定 (これをしないと 整数配列に変換されて, "2023-01-01"のような形にならない)
        module.addSerializer(LocalDate.class, new LocalDateSerializer(DateTimeFormatter.ISO_LOCAL_DATE));

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(module);
        return mapper;
    }
}
