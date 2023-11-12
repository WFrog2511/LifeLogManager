package wfrog.llmanager.LifeLogManager.controller;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import wfrog.llmanager.LifeLogManager.domain.DiaryEntry;
import wfrog.llmanager.LifeLogManager.dto.DiaryDataRequest;
import wfrog.llmanager.LifeLogManager.service.DiaryService;

@RestController
@RequestMapping("/api/diaries")
public class DiaryController {
    private final DiaryService diaryService;

    public DiaryController(DiaryService diaryService) {
        this.diaryService = diaryService;
    }

    @PostMapping
    public ResponseEntity<DiaryEntry> createDailyLog(@RequestBody DiaryDataRequest request) {
        DiaryEntry savedDailyLog = diaryService.saveDailyLog(
                request.getDate(),
                request.getEvents(),
                request.getInsights(),
                request.getUserId());
        return new ResponseEntity<>(savedDailyLog, HttpStatus.CREATED);
    }
}