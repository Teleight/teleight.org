# Logging
Teleight uses the SLF4J logging facade to provide logging capabilities. This allows you to use any SLF4J-compatible logging framework, such as Logback, Log4j, or similar.

By default, Teleight uses the `slf4j-simple` logger implementation. This implementation is very basic and is suitable for most use cases. However, you can easily configure Teleight to use a different logging framework by adding the appropriate dependencies to your project.

## How to use the logger
To use the logger in your code, you can simply call the `LoggerFactory.getLogger` method and pass a string (or a class) as the logger name.
```java
final Logger log = LoggerFactory.getLogger("your-logger-name");
log.info("This is an info message");
log.warn("This is a warning message");
log.error("This is an error message");
```

## Bring your own logger
If you prefer to use your own logging framework, you can easily configure Teleight to use it. You need to add the appropriate dependencies to your project and configure the logging framework according to its documentation.

Also, you need to exclude the `slf4j-simple` dependency from the Teleight Bots dependency to avoid conflicts with your logging framework.

::: code-group

```kts [Gradle (kotlin)]
configurations.all {
  exclude(group = "org.slf4j", module = "slf4j-simple")
}
```

```groovy [Gradle (groovy)]
configurations.all {
  exclude group: "org.slf4j", module: "slf4j-simple"
}
```

```xml [Maven]
<exclusions>
    <exclusion>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-simple</artifactId>
    </exclusion>
</exclusions>
```

:::

The [demo](https://github.com/Teleight/TeleightBots/tree/master/demo) project provides an example `logback` logging configuration file that you can use as a reference.
