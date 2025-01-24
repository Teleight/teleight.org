# Command System
The Command System in TeleightBots provides a flexible way to handle user inputs through predefined commands. This system allows you to define commands with multiple syntaxes, each accepting different arguments and conditions.

::: info
This command system is heavily inspired by the [Minestom](https://minestom.net/docs/feature/commands) project.
:::

## Creating a Command
Start by creating a new class that extends `Command`. Specify the command name and any aliases it should have.

```java
public class TestCommand extends Command {

    public TestCommand() {
        // Command name and aliases. The primary name is "test". The command can also be invoked using "test1".
        super("test", "test1");

        setDefaultExecutor((sender, context) -> {
            final String message = "Test command executed by " + sender.username() + ". Input: " + context.getInput();
            System.out.println(message);

            context.bot().execute(SendMessage.ofBuilder(context.message().chatId(), message).build());
        });
    }

}
```

After defining your command, register it with the bot's command manager.

```java
bot.getCommandManager().registerCommand(new TestCommand());
```

## Defining Command Arguments

Arguments define what inputs a command can accept. Teleight provides various argument types, such as `ArgumentInteger` and `ArgumentString`. Here's how to define them:

```java
final ArgumentInteger argumentInteger = new ArgumentInteger("int1");
final ArgumentString argumentString = new ArgumentString("string1");
```

These arguments can then be used in different syntaxes to define how the command should be invoked.

## Adding Multiple Syntaxes

A single command can support multiple ways of being invoked by defining various syntaxes. This allows flexibility in how users interact with your bot.

```java
// Syntax 1: /test 123 456
addSyntax((sender, context) -> {
    int value1 = context.getArgument(argumentInteger);
    int value2 = context.getArgument(argumentInteger2);

    // Execute desired action
}, argumentInteger, argumentInteger2);

// Syntax 2: /test 123 hello
addSyntax((sender, context) -> {
    int value = context.getArgument(argumentInteger);
    String text = context.getArgument(argumentString1);

    // Execute desired action
}, argumentInteger, argumentString1);

// Syntax 3: /test 123
addSyntax((sender, context) -> {
    int value = context.getArgument(argumentInteger);

    // Execute desired action
}, argumentInteger);
```

## Using Command Conditions

Conditions allow you to restrict command execution based on specific criteria. For example, you might want only admins to execute certain commands.

```java
final ArgumentString argumentString = new ArgumentString("string1");
final CommandCondition isPremium = (bot, sender, message) -> sender.isPremium();

addConditionalSyntax(isAdmin, (sender, context) -> {
    // Execute premium-specific action
}, argumentString);
```

In this example, the syntax will only be executed if the user (`sender`) satisfies the `isPremium` condition and the input matches the defined syntax.

## Handling Default Execution

If a user's input doesn't match any defined syntax, the command can fall back to a default executor. This is useful for providing feedback or help messages.

```java
setDefaultExecutor((sender, context) -> {
    SendMessage message = SendMessage.ofBuilder(context.message().chatId(), "Invalid command syntax. Please try again.").build();
    context.bot().execute(message);
});
```
