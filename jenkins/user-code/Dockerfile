FROM openjdk:11-jdk AS builder

WORKDIR /app

COPY . .

ENV SPRING_DATASOURCE_URL=jdbc:mariadb://host.docker.internal:3306/algopat?serverTimezone=UTC&useUniCode=yes&characterEncoding=UTF-8

ENV SPRING_DATASOURCE_USERNAME=root

ENV SPRING_DATASOURCE_PASSWORD=ssafya706!

RUN chmod +x gradlew

RUN ./gradlew -x compileTestJava build

FROM openjdk:11-jdk

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 28080

CMD ["java", "-Duser.timezone=Asia/Seoul", "-jar", "app.jar"]

