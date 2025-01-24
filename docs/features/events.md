# Event System

The event system in TeleightBots allows you to handle various events that occur during the bot's lifecycle. The event system is designed to be flexible and easy to use, enabling you to create custom event listeners for your specific needs.

::: tip
Every listener execution is done in a separate thread.
:::

## Creating an Event Listener

To create an event listener, you can use the `EventListener` interface. This interface provides a way to handle events of a specific type. You can create an event listener using the `ofBuilder` method, which allows you to configure the listener with various settings.

Here's an example of how to create an event listener for the `UpdateReceivedEvent`:

```java
final EventListener<UpdateReceivedEvent> updateEvent = EventListener.ofBuilder(UpdateReceivedEvent.class)
    .handler(event -> System.out.println("UpdateReceivedEvent: " + event.bot().getBotUsername() + " -> " + event))
    .build();
```

In this example, the event listener is configured to handle `UpdateReceivedEvent` events and print a message to the console whenever an update is received.

## Registering an Event Listener

Once you have created an event listener, you need to register it with the `EventManager` so that it can start receiving events. You can do this using the `addListener` method of the `EventManager` class.

Here's an example of how to register the event listener created above:

```java
bot.getEventManager().addListener(updateEvent);
```

This will add the event listener to the `EventManager`, and it will start receiving `UpdateReceivedEvent` events.

## Using a Consumer to Handle Events

If you prefer a simpler approach, you can use a `Consumer` to handle events directly. This method is less flexible than creating a full `EventListener`, but it can be useful for simple use cases.

Here's an example of how to use a `Consumer` to handle `UpdateReceivedEvent` events:

```java
bot.getEventManager().addListener(UpdateReceivedEvent.class, event -> {
    System.out.println("UpdateReceivedEvent: " + event.bot().getBotUsername() + " -> " + event);
});
```

In this example, the `Consumer` is registered with the `EventManager` to handle `UpdateReceivedEvent` events and print a message to the console.

## Event Filters and more

The `EventListener` builder is quite flexible and allows you to configure various settings for the event listener

```java
final EventListener<UpdateReceivedEvent> updateEvent = EventListener.ofBuilder(UpdateReceivedEvent.class)
    .handler(event -> System.out.println("UpdateReceivedEvent: " + event.bot().getBotUsername() + " -> " + event))
    .filter(event -> event.bot().getBotUsername().equals("my_bot_username")) // This listener will only process events if the bot username is "my_bot_username"
    .expireCount(5) // This listener will stop listening after 5 events have been received
    .build();
```

In this example, the `EventListener` is configured with a handler, a filter to only process events for a specific bot username, and settings to ignore canceled events and set an expiration count.
