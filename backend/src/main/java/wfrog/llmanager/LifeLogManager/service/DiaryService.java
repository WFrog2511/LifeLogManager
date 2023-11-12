package wfrog.llmanager.LifeLogManager.service;

import java.time.LocalDate;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import wfrog.llmanager.LifeLogManager.domain.DiaryEntry;
import wfrog.llmanager.LifeLogManager.domain.User;
import wfrog.llmanager.LifeLogManager.repository.DiaryEntryRepository;
import wfrog.llmanager.LifeLogManager.repository.UserRepository;

@Service
public class DiaryService {

    private final DiaryEntryRepository dailyLogRepository;
    private final UserRepository userRepository;

    public DiaryService(DiaryEntryRepository dailyLogRepository, UserRepository userRepository) {
        this.dailyLogRepository = dailyLogRepository; // @Autowiredを付けなくても自動でDIされる
        this.userRepository = userRepository;
    }

    @Transactional
    public DiaryEntry saveDiaryEntry(Long userId, LocalDate date, String events, String insights,
            Set<String> routineTasks) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        DiaryEntry dailyLog = new DiaryEntry();
        dailyLog.setUser(user);
        dailyLog.setDate(date);
        dailyLog.setEvents(events);
        dailyLog.setInsights(insights);
        dailyLog.setRoutineTasks(routineTasks);

        return dailyLogRepository.save(dailyLog);
    }
}
