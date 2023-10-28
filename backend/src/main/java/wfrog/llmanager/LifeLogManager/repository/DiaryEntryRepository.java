package wfrog.llmanager.LifeLogManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import wfrog.llmanager.LifeLogManager.domain.DiaryEntry;

public interface DiaryEntryRepository extends JpaRepository<DiaryEntry, Long> {
}
