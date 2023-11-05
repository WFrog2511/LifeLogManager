FROM openjdk:17

WORKDIR /app

# Run the tests (イメージのビルド時 実行)
# RUN ./mvnw test

# Run the application (コンテナ実行時 に実行)
CMD ["./mvnw", "spring-boot:run", "-e"]

