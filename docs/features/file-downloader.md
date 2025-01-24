# File Downloader

The `FileDownloader` interface in TeleightBots provides methods to download files from Telegram. This can be useful for bots that need to handle media files, documents, or any other type of file that users send.

## Usage
You can use the `bot.getFileDownloader().downloadFile(..)` methods to download a file from Telegram. Every method returns a `CompletableFuture` that will complete with the downloaded `java.io.File`.

```java
bot.getFileDownloader().downloadFile(filePath).thenAccept(file -> {
    System.out.println("File downloaded to: " + file.getAbsolutePath());
}).exceptionally(ex -> {
    System.err.println("Failed to download file: " + ex.getMessage());
    return null;
});
```
