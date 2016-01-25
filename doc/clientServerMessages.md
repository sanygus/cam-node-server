# Client -> Server

### Значения датчиков
event: 'sensors'

data:

    {
      date: 'yyyy-mm-dd\'T\'HH:MM:ss',
      sensorname1: value1 (string or num),
      sensorname2: value2 (string or num),
      ...
    }

### Файлы
event: 'file'

data:

    {
    	filename: 'filename',
    	content: binary?
    }

### Настройки
event: 'settings'

data:

    {
      photo: {
        param1: value1,
        ...
      },
      video: {
        param1: value1,
        ...
      }
    }

# Server -> Client

### Действия
event: 'acts'

data:

    [
      {
        act: value0 (string),
        param1: value1 (string or num),
        ...
      },
      ...
    ]

### Настройки
event: 'settings'

data:

    {
      photo: {
        param1: value1,
        ...
      },
      video: {
        param1: value1,
        ...
      }
    }

