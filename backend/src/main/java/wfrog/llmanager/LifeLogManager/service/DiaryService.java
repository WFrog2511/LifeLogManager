package wfrog.llmanager.LifeLogManager.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import wfrog.llmanager.LifeLogManager.domain.DiaryEntry;
import wfrog.llmanager.LifeLogManager.repository.DiaryEntryRepository;

@Service
public class DiaryService {

    private final DiaryEntryRepository dailyLogRepository;

    public DiaryService(DiaryEntryRepository dailyLogRepository) {
        this.dailyLogRepository = dailyLogRepository; // @Autowiredを付けなくても自動でDIされる
    }

    @Transactional
    public DiaryEntry saveDailyLog(DiaryEntry dailyLog) {
        return dailyLogRepository.save(dailyLog);
    }
}
