CREATE TABLE IF NOT EXISTS messages (
    body VARCHAR(150),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    messageId INT NOT NULL,
    PRIMARY KEY (messageId)
);
ALTER TABLE messages MODIFY COLUMN messageId INT NOT NULL AUTO_INCREMENT;
