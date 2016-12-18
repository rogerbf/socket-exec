# socket-exec

Write data to a socket and get a promise back which:

- resolves with the response when the connection is closed.
- rejects if there is an error or an optionally defined timeout.

## usage

```javascript
import socketExec from 'socket-exec'

const controlPort = socketExec({ port: 9055 })

controlPort([`AUTHENTICATE\r\n`, `HEARTBEAT\r\n`, `QUIT\r\n`])
  .then(success)
  .catch(error)
```

## api

### `socketExec(options)`

Options are what `net.createConnection` receives.
