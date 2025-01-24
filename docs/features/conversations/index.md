# Conversation API
A conversation represents a structured interaction between a bot and a user.
It typically follows a sequence of exchanges (messages) where the bot prompts the user for input, processes the response, and decides on the next step.

Imagine this example: a bot asks the user for their name, then asks for their age, and finally asks for their favorite color.
Each of these steps is a conversation turn, and the entire sequence is a conversation.

Normally, you would have to listen for each message and keep track of the conversation state manually.
However, with the Conversation API, you can define a conversation as workflow and let Teleight handle the conversation flow for you.

## Creating a Conversation
To create a conversation, you need to implement the `ConversationExecutor` interface.
```java
public class TestConversation implements ConversationExecutor {

    @Override
    public void execute(@NotNull ConversationContext context) {
        final Chat chat = context.chat();
        final String chatId = String.valueOf(chat.id());

        // Let's start the conversation by sending a message to the user
        SendMessage startMessage = SendMessage.ofBuilder(chatId, "Send me a message with the text \"hello\"").build();
        context.bot().execute(startMessage);

        // Now, let's wait for an update. We give the user 10 seconds to reply.
        // If the result is null, that means the bot did not receive an update in time
        final Update update = context.waitForUpdate(10, TimeUnit.SECONDS);

        if (update == null) {
            // And this is the case, so let's leave the conversation and send an error message to the user
            SendMessage resultToUser = SendMessage.ofBuilder(chatId, "You didn't send the message in time..").build();
            context.bot().execute(resultToUser);
            return;
        }

        // Let's get a message from the update
        final Message message = update.message();

        if (message == null) {
            // The message is null, and it's not what we want
            // This happens when the bot receives an update which does not contain a message.
            SendMessage resultToUser = SendMessage.ofBuilder(chatId, "You didn't send a message..").build();
            context.bot().execute(resultToUser);
            return;
        }

        // Now, check if the text equals hello or not and act appropriately
        String resultToUser;
        if (message.text() == null || !message.text().equals("hello")) {
            resultToUser = "You didn't send \"hello\"!";
        } else {
            resultToUser = "Good job!";
        }
        final SendMessage result = SendMessage.ofBuilder(chatId, resultToUser).build();
        context.bot().execute(result);
    }

}
```

The main method you will use for continuing the flow is the `waitForUpdate` method inside the `ConversationContext` class.
This method will wait for an update from the user for a specified amount of time.
If the user does not respond in time, the method will return `null`.

## Registering the Conversation
To register a conversation, call the `registerConversation` method.
Required parameters are the conversation name (which will be used as identifier) and the conversation instance.

```java
final Conversation testConversation = Conversation.of("test", new TestConversation());
bot.getConversationManager().registerConversation(testConversation);
```

## Joining a Conversation
To start a conversation, you need to call the `startConversation` method.
```java
final JoinResult result = bot.getConversationManager().startConversation(user, chat, "test");
```

This will return a `JoinResult` object that contains the result of the operation.
```java
if (result instanceof ConversationManager.JoinResult.AlreadyInConversation) {
    System.out.println("User is already in conversation");
} else if (result instanceof ConversationManager.JoinResult.ConversationNotFound) {
    System.out.println("Conversation not found");
} else {
    System.out.println("Conversation started");
}
```
