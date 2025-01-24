---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "TeleightBots"
  text: "Enhancing bot development in java"
  actions:
    - theme: brand
      text: Get Started
      link: /quick-start
    - theme: alt
      text: API Playground
      link: /playground
    - theme: alt
      text: GitHub
      link: https://github.com/TechCavern/TeleightBots

features:
  - title: Lightweight
    details: TeleightBots is designed to be lightweight and as efficient as possible.
  - title: Easy to Use
    details: TeleightBots is designed to be easy to use and easy to understand.
  - title: Modern
    details: TeleightBots uses the latest java features to provide a more flexible and modern experience.
---


## Quick start

[Just add the TeleightBots dependency to your project](quick-start#dependencies) and add the following code to your main class:

```java
final String botToken = "your_bot_token_here"; // <-- The bot token from @BotFather
final String botUsername = "your_bot_username_here"; // <-- The bot username

// You custom listener. In this example, we are printing the event whether a generic update is received.
final EventListener<UpdateReceivedEvent> updateEvent = EventListener.ofBuilder(UpdateReceivedEvent.class)
        .handler(event -> System.out.println("UpdateReceivedEvent: " + event.bot().getBotUsername() + " -> " + event))
        .build();

// Register the bot
TeleightBots.getBotManager().registerLongPolling(botToken, botUsername, bot -> {
    bot.getEventManager().addListener(updateEvent);
}
```

And you're good to go!
