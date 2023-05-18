FROM openjdk:11-jdk AS builder

WORKDIR /app

COPY . .


RUN chmod +x gradlew

RUN ./gradlew -x compileTestJava build

FROM openjdk:11-jdk

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 28761

CMD ["java", "-Duser.timezone=Asia/Seoul", "-jar", "app.jar"]

