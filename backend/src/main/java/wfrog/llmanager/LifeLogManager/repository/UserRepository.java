package wfrog.llmanager.LifeLogManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import wfrog.llmanager.LifeLogManager.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
