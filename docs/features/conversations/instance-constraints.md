# Instance Constraints in a Conversation
You can set constraints on the number of instances of a conversation that can be active at any given time. This can be useful if you want to limit the number of users/chats that can participate in a conversation at once.

## Setting Instance Constraints
To set instance constraints for a conversation, you need to create an `ConversationInstanceConstraints` object and pass it to the conversation builder

```java
Conversation testConversation = Conversation.ofBuilder("test", new TestConversation())
        .instanceConstraints(ConversationInstanceConstraints.ofBuilder().maxInstances(1).build())
        .build();
bot.getConversationManager().registerConversation(testConversation);
```

In this example, we set the maximum number of instances to 1. This means that only one instance of the conversation can be active at any given time.

If we want to allow a maximum of 5 instances per chat, we can set the `maxInstancesPerChat` property.

```java
Conversation testConversation = Conversation.ofBuilder("test", new TestConversation())
        .instanceConstraints(ConversationInstanceConstraints.ofBuilder().maxInstancesPerChat(1).build())
        .build();
bot.getConversationManager().registerConversation(testConversation);
```

See the [Javadoc](https://javadoc.teleight.org/org/teleight/teleightbots/conversation/ConversationInstanceConstraints.java) for more information on the available properties.

## Handling Instance Constraints
When a user tries to start a conversation that has exceeded its maximum number of instances, the `startConversation` method will return a `JoinResult` object with the `ConversationManager.JoinResult.InstanceConstraintReached` type.

The user will not enter the conversation.

```java
final ConversationManager.JoinResult result = context.bot().getConversationManager().joinConversation(...);
if (result instanceof ConversationManager.JoinResult.InstanceConstraintReached(String constraint)) {
    System.out.println("Constraint reached: " + constraint);
}
```
