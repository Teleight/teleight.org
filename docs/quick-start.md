# Getting started

TeleightBots is a fully asynchronous, lightweight library that allows you to create bots for Telegram in Java.

It is designed to be easy to use and easy to understand and uses the latest java features to provide a more flexible and modern experience.

In addition to the Telegram Bot API wrapper, TeleightBots also provides several powerful features to make bot development easier and more efficient,
such as the event system, command system, and more.

## Dependencies

To get started with TeleightBots, you need to add the TeleightBots dependency to your project. We recommend using a build tool like Maven or Gradle.
::: code-group

```kts [gradle (kotlin)]
implementation("org.teleight:teleightbots:1.0.0")
```

```groovy [gradle (groovy)]
implementation 'org.teleight:teleightbots:1.0.0'
```

```xml [maven]
<dependency>
  <groupId>org.teleight</groupId>
  <artifactId>teleightbots</artifactId>
  <version>1.0.0</version>
  <scope>compile</scope>
</dependency>
```

:::

::: warning
**Note:** TeleightBots requires Java 21 or higher.
:::


After adding the dependency, you can start creating your bot. You can choose either a long-polling or webhook approach to receive updates from Telegram.
