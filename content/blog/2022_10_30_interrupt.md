+++
title = "Java's Interrupt & Timeout (Part 1)"
slug = "java-interrupts"
date = 2022-10-30
draft = true
+++


```java
var job = new Thread(() -> {
  while (true) {}
});
job.start(); 
job.interrupt();
```


```java
var job = new Thread(() -> {
  Thread.sleep(1000);
});
job.start(); 
job.interrupt();
```

```java
var job = new Thread(() -> {
  synchronize(lock) {}
});
job.start(); 
job.interrupt();
```


```java
var job = new Thread(() -> {
  countDownLatch.await();
});
job.start(); 
job.interrupt();
```


```java
for (;;) {
  if (Thread.interrupted())
    return;
  heavyCrunch();
}
```