# Getting started with Long Polling
Long-polling is the simplest way to receive updates from Telegram. With this approach, your bot sends a request to the Telegram API and waits for a response. If there are no updates available, the request will hang until a new update is received or a timeout occurs.

See the [Choosing the right update system](./choosing-update-system) page for more information.

## Overview
In order to create a bot using long-polling, you need to register the bot using the `registerLongPolling` method of the `BotManager` class.

```java
final String botToken = "your_bot_token_here"; // <-- The bot token from @BotFather
final String botUsername = "your_bot_username_here"; // <-- The bot username

// Register the bot
TeleightBots.getBotManager().registerLongPolling(botToken, botUsername, bot -> {
    // Your code here
}
```

That's it! You have successfully registered your bot.

## Customizing
You can customize the long-polling behavior by passing additional parameters to the `registerLongPolling` method as a `LongPollingSettings` object.

You can use the `LongPollingSettings.ofBuilder()` method to create a new `LongPollingSettings` object with the desired settings.
You can customize settings like the endpoint URL, updates limit, updates timeout, and more. Check out the [Javadoc](https://teleight.dev/javadoc/dev/teleight/teleightbots/LongPollingSettings.html) for more information.

```java
final String botToken = "your_bot_token_here"; // <-- The bot token from @BotFather
final String botUsername = "your_bot_username_here"; // <-- The bot username
final LongPollingSettings settings = LongPollingSettings.ofBuilder()
        .endpointUrl("https://api.telegram.org/bot")
        .updatesLimit(100)
        .updatesTimeout(30)
        .build();

// Register the bot
TeleightBots.getBotManager().registerLongPolling(botToken, botUsername, settings, bot -> {
    // Your code here
}
```
