# Custom Properties in Conversations

In TeleightBots, custom properties allow you to define and manage additional data within a conversation.
These properties can be used to store and retrieve information that is relevant to the conversation flow.

## Required vs Optional Properties
Each property can be defined as required or optional.
Required properties must be set when the conversation is created, while optional properties can be set in the join conversation operation.

## Defining Custom Properties
Custom properties are defined using the `Property` class.
Each property has a name, a value, and a flag indicating whether it is required or optional.

If you create a property with a default value, it will be considered optional:
```java
Property<String> testProperty = Property.of("testProperty", "defaultValue");
```

If you instead create a property without a default value, it will be considered required:
```java
Property<Integer> testProperty = Property.of("testProperty");
```

### Property Methods

The `Property` class provides several methods to retrieve the value in different types:

- `asString()`: Returns the value as a string.
- `asInt()`: Returns the value as an integer.
- `asBool()`: Returns the value as a boolean.
- `asLong()`: Returns the value as a long.
- `asFloat()`: Returns the value as a float.
- `as(Class<? extends A> type)`: Returns the value as a custom type.

## Registering a Conversation with Custom Properties

To register a conversation with custom properties, you can use the `ofBuilder` method of the `Conversation` class and the `property` or `properties` method to add custom properties:

```java
Conversation testConversation = Conversation.ofBuilder("testConversation", new TestConversation())
        .property(Property.of("isThisAProperty", true))
        .property(Property.of("isUserAdmin", false))
        .allowUnknownProperties(true)
        .build();

bot.getConversationManager().registerConversation(testConversation);
```

The `allowUnknownProperties` method allows you to specify whether unknown properties should be allowed in the conversation.
Unknown properties are properties that are not explicitly defined when the conversation is registered, and can be applied later when you use the `joinConversation` method.

If this flag is set to `false` (default behavior), an exception will be thrown if an unknown property is passed to the conversation.


## Example Usage

Here's an example of how to use custom properties in a conversation:

```java
public class TestConversation implements ConversationExecutor {

    @Override
    public void execute(@NotNull ConversationContext context) {
        final Chat chat = context.chat();
        final String chatId = String.valueOf(chat.id());

        // Retrieve the custom property.
        // Be careful: getProperty() can return a null value if the property is not found
        // In this case, we can omit the null check because we know the property is defined directly in the conversation
        boolean testProperty = context.getProperty("isThisAProperty").asBool();

        // Use the property in the conversation logic
        if (testProperty) {
            SendMessage message = SendMessage.ofBuilder(chatId, "Property is true").build();
            context.bot().execute(message);
        } else {
            SendMessage message = SendMessage.ofBuilder(chatId, "Property is false").build();
            context.bot().execute(message);
        }
    }
}
```

## Joining a Conversation with Properties

When a user joins a conversation, you can pass a map of properties to initialize the conversation with specific values:

```java
Map<String, Object> properties = Map.of(
    "name", "John",
    "age", 25
);

ConversationManager.JoinResult result = context.bot().getConversationManager().joinConversation(
    sender, context.message().chat(), "testConversation", properties);

if (result instanceof ConversationManager.JoinResult.AlreadyInConversation) {
    System.out.println("User is already in conversation");
} else if (result instanceof ConversationManager.JoinResult.ConversationNotFound) {
    System.out.println("Conversation not found");
} else {
    System.out.println("Conversation started");
}
```

In this example, the user joins the conversation with the properties `name` and `age` set to specific values.

::: warning
In this example, `name` and `age` are considered unknown properties because they were not defined when the conversation was registered.
If `allowUnknownProperties` is set to `false`, an exception will be thrown when the user tries to join the conversation with unknown properties.
:::
