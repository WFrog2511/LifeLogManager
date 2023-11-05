package wfrog.llmanager.LifeLogManager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import wfrog.llmanager.LifeLogManager.domain.DiaryEntry;
import wfrog.llmanager.LifeLogManager.domain.User;
import wfrog.llmanager.LifeLogManager.repository.DiaryEntryRepository;
import wfrog.llmanager.LifeLogManager.repository.UserRepository;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/api/diaries")
public class DiaryController {

    @Autowired
    private DiaryEntryRepository diaryEntryRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{userId}")
    public DiaryEntry createDiaryEntry(
            @PathVariable Long userId,
            @RequestParam("date") String date_str,
            @RequestParam("text") String text,
            @RequestParam("image") MultipartFile imageFile) throws IOException, ParseException {
        User user = userRepository.findById(userId).orElseThrow();
        DiaryEntry diaryEntry = new DiaryEntry();
        diaryEntry.setUser(user);

        SimpleDateFormat sdFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = sdFormat.parse(date_str);
        diaryEntry.setDate(date);
        diaryEntry.setText(text);
        diaryEntry.setImage(imageFile.getBytes());
        return diaryEntryRepository.save(diaryEntry);

    }
}
