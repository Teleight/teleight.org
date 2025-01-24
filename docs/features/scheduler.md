# Scheduling
If you want to schedule tasks to be executed withing another thread, you can use the `Scheduler` interface.
The `Scheduler` interface provides a way to create and submit tasks to be executed without resorting to manual thread management.

## Creating a new task
In order to create a new task, you can use the `buildTask` method:
```java
bot.getScheduler().buildTask(() -> {
    System.out.println("This task will be executed once after 10 seconds");
}).delay(10, TimeUnit.SECONDS).schedule();
```

It will return a `Task` class that you can use for stuff like closing the scheduled task.

See the [javadoc](https://teleight.github.io/TeleightBots/org/teleight/teleightbots/scheduler/Task.html) for more information.
