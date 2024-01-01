# modules

## _Javascript tools_

### Fitur

- modules.addModule - menambahkan module dari absolute path. Tidak perlu kawatir akan error karena salah mime type
- modules.getModule - promise mengunduh modul.

## Petunjuk

```javascript
import { modules } from "./dist/modul.min.js";

// add modul
modules.addModule('absolute path')

// get module
const funtionName = modules.getModule('functionName')
```
