# socket-exec

Connects to a socket, writes data, returns a Promise which:

- resolves with any received data when the connection is closed.
- rejects if there is an error or an optionally defined timeout is reached.

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

Options are passed on to `net.createConnection`.
