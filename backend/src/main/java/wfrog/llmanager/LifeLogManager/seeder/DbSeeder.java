package wfrog.llmanager.LifeLogManager.seeder;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import wfrog.llmanager.LifeLogManager.repository.UserRepository;
import wfrog.llmanager.LifeLogManager.domain.User;

@Component
public class DbSeeder implements CommandLineRunner {
    private final UserRepository userRepository;

    public DbSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        User user1 = new User();
        user1.setId(1L);
        user1.setPassword("password");
        user1.setUsername("Tom");

        user1.addRoutineTask("task1");

        User user2 = new User();
        user2.setId(2L);
        user2.setPassword("password");
        user2.setUsername("Bob");

        user2.addRoutineTask("task1");
        user2.addRoutineTask("task2");

        // すでにデータが存在していないかチェック
        if (userRepository.findAll().isEmpty()) {
            userRepository.save(user1);
            userRepository.save(user2);
        }
    }
}
