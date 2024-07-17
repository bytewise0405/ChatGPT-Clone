FROM maven:3.6.3-openjdk-17-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the project files
COPY . .

RUN mvn install

# Expose the port that the application listens on
EXPOSE 8080

## 5. Define the command to run when the container starts.
CMD ["mvn", "spring-boot:run"]