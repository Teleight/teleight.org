# Extensions
Extensions are a way to add new features to a specific bot. They are standalone jar files that can be loaded at runtime.

They are extremely useful for creating a modular bot that can be easily extended with new functionality without having to recompile the entire project.

## Allowing Extensions In Your Bot
To allow extensions in your bot, you need to set the `allowExtensions` property to `true` in the bot settings. This works with both long-polling and webhooks.

```java
final LongPollingBotSettings botSettings = LongPollingBotSettings.ofBuilder()
        .extensionsEnabled(true)
        .build();

TeleightBots.getBotManager().registerLongPolling(botToken, botUsername, botSettings, bot -> {
    // Your code here
});
```

When the bot is started, it will look for extensions in the `extensions` directory and load them automatically.
If the directory does not exist, the bot will create it.

## Creating an Extension

### Create a new Java project
We recommend using a build tool like Maven or Gradle to manage your project dependencies. See the [Dependencies](../quick-start.md#dependencies) guide for more information.

Bundling the TeleightBots library with your extension is not necessary, as the bot will load the extension at runtime.

### Create the entry point
Create a new class that extends the `Extension` class. This class will be the entry point for your extension.
```java
public class MyFantasticExtension extends Extension {

    // This constructor will be called by the bot when the extension is loaded
    public MyFantasticExtension(TelegramBot bot) {
        super(bot);
    }

    @Override
    public void start() {
    }

    @Override
    public void shutdown() {

    }

}
```

### Implement your logic
You can now have fun implementing everything you want in your extension. You can use the bot instance to interact with the library.

### Register your extension
To register your extension, you have two options:
1. [Create a `teleight-extension.json` file in the resources directory](#create-a-teleight-extension-json-file)
2. [Use the `ExtensionInfo` annotation](#use-the-extensioninfo-annotation)

#### Create a `teleight-extension.json` file
Create a new file in the `resources` directory called `teleight-extension.json` and add the following content:
```json
{
  "name": "your_extension_name",
  "version": "1.0.0",
  "parentBot": "your_bot_username",
  "mainClass": "your.extension.package.MyFantasticExtension"
}
```

#### Use the `ExtensionInfo` annotation
Use the `ExtensionInfo` annotation to provide the necessary information about your extension.
```java
@ExtensionInfo(name = "your_extension_name", version = "1.0.0", parentBot = "your_bot_username")
public class MyFantasticExtension extends Extension {
    // Your code here
}
```

### Build your extension
Build your extension as a jar file. Make sure to include the `teleight-extension.json` file in the jar if you chose the first option.

### Load your extension
Place the jar file in the `extensions` directory of your bot. The bot will automatically load the extension when it starts.
