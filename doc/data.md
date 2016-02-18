## Статистика
event: statistics

Общий вид

    {
      date 'yyyy-mm-dd HH:MM:ss',
      sent (bool),
      ...
    }

### Системная

    {
      date 'yyyy-mm-dd HH:MM:ss',
      sent (bool),
      uptime (sec),
      disk (free bytes),
    }

### По файлам

    {
      date 'yyyy-mm-dd HH:MM:ss',
      sent (bool),
      size (bytes),
      time (ms),
    }

## Значения датчиков
event: sensors

    {
      date 'yyyy-mm-dd HH:MM:ss',
      cputemp ('C),
      pingtime (ms),
    }
