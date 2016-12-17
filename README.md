# socket-exec

Write data to a socket and get a promise back that:
- resolves with the response when the connection is closed.
- rejects if there is an error or a optionally defined timeout.

## usage

```javascript
import exec from 'socket-exec'

const controlPort = exec({ port: 9055 })

controlPort([`AUTHENTICATE\r\n`, `HEARTBEAT\r\n`, `QUIT\r\n`])
  .then(success)
  .catch(error)
```
